const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Buscar todos os usuários
exports.getAllUsers = async (req, res, next) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM Usuarios');
    res.json({ success: true, data: usuarios });
  } catch (err) {
    next(err);
  }
};

// Cadastrar novo usuário
exports.signup = async (req, res, next) => {
  try {
    const { nome, cpf, telefone, email, senha } = req.body;

    const senha_hash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO Usuarios (nome, cpf, telefone, email, senha_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, cpf, telefone, email, senha_hash]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      id_usuario: result.insertId
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, message: 'CPF ou email já cadastrado' });
    } else {
      next(err);
    }
  }
};

// Login (caso queira reaproveitar aqui)
exports.login = async (req, res, next) => {
  res.status(400).json({ success: false, message: 'Use /api/login/usuario ou /motoboy' });
};

// Atualizar usuário
exports.editarUsuario = async (req, res, next) => {
  try {
    const { id_usuario, nome, telefone } = req.body;

    await pool.query(
      `UPDATE Usuarios SET nome = ?, telefone = ? WHERE id_usuario = ?`,
      [nome, telefone, id_usuario]
    );

    res.json({ success: true, message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;

    await pool.query(`DELETE FROM Usuarios WHERE id_usuario = ?`, [id_usuario]);

    res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Alterar senha
exports.alterarSenha = async (req, res, next) => {
  try {
    const { id_usuario, novaSenha } = req.body;
    const senha_hash = await bcrypt.hash(novaSenha, 10);

    await pool.query(
      `UPDATE Usuarios SET senha_hash = ? WHERE id_usuario = ?`,
      [senha_hash, id_usuario]
    );

    res.json({ success: true, message: 'Senha alterada com sucesso' });
  } catch (err) {
    next(err);
  }
};
