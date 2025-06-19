const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastro de usuário
exports.signup = async (req, res, next) => {
  try {
    const { nome, cpf, email, senha, telefone, endereco, tipo } = req.body;

    if (!nome || !cpf || !email || !senha || !tipo) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios ausentes' });
    }

    const [existe] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ success: false, message: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO Usuarios (nome, cpf, email, senha_hash, telefone, endereco, tipo)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, cpf, email, senhaHash, telefone || '', endereco || '', tipo]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado',
      id_usuario: result.insertId
    });

  } catch (err) {
     if (err.code === 'ER_DUP_ENTRY') {
      let campo = '';
      if (err.message.includes('cpf')) campo = 'CPF';
      else if (err.message.includes('email')) campo = 'Email';

      return res.status(400).json({
        success: false,
        message: `${campo} já cadastrado`
      });
    }
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    const usuario = rows[0];

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        tipo: usuario.tipo
      },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login bem-sucedido',
      token
    });

  } catch (err) {
    next(err);
  }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res, next) => {
  try {
    const [users] = await pool.query('SELECT id_usuario, nome, email, tipo FROM Usuarios');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// Atualizar usuário
exports.editarUsuario = async (req, res, next) => {
  try {
    const { id_usuario, nome, telefone, endereco } = req.body;

    await pool.query(
      `UPDATE Usuarios SET nome = ?, telefone = ?, endereco = ? WHERE id_usuario = ?`,
      [nome, telefone, endereco, id_usuario]
    );

    res.json({ success: true, message: 'Usuário atualizado' });
  } catch (err) {
    next(err);
  }
};

//Atualizar senha com hash
exports.alterarSenha = async (req, res, next) => {
  try {
    const { email, senha_atual, nova_senha } = req.body;

    if (!email || !senha_atual || !nova_senha) {
      return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
    }

    const [[usuario]] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha_atual, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha atual incorreta' });
    }

    const novaHash = await bcrypt.hash(nova_senha, 10);

    await pool.query(
      'UPDATE Usuarios SET senha_hash = ? WHERE email = ?',
      [novaHash, email]
    );

    res.json({ success: true, message: 'Senha atualizada com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;

  // Verifica se há pedidos vinculados a este usuário
    const [pedidos] = await pool.query('SELECT COUNT(*) AS total FROM Pedidos WHERE cliente_id = ?', [id_usuario]);
    if (pedidos[0].total > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível deletar o usuário. Existem pedidos associados a este usuário.'
      });
    }

    // Se não houver, prossegue com a exclusão
    await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_usuario]);

    res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (err) {
    next(err);
  }
};