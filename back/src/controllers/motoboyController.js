const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Criar motoboy
exports.criarMotoboy = async (req, res, next) => {
  try {
    const {
      nome, cpf, email, senha,
      telefone, endereco, cnh, placa_moto, dados_bancarios
    } = req.body;

    if (!nome || !cpf || !email || !senha || !cnh || !placa_moto) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios ausentes' });
    }

    const [existe] = await pool.query('SELECT * FROM Motoboys WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ success: false, message: 'Email já cadastrado' });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO Motoboys (nome, cpf, email, senha_hash, telefone, endereco, cnh, placa_moto, dados_bancarios)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, cpf, email, senha_hash, telefone || '', endereco || '', cnh, placa_moto, dados_bancarios || '']
    );

    res.status(201).json({
      success: true,
      message: 'Motoboy cadastrado com sucesso',
      id_motoboy: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

// Listar todos os motoboys
exports.listarMotoboys = async (req, res, next) => {
  try {
    const [motoboys] = await pool.query(
      'SELECT id_motoboys, nome, email, telefone, cnh, placa_moto FROM Motoboys'
    );
    res.json({ success: true, data: motoboys });
  } catch (err) {
    next(err);
  }
};

// Atualizar motoboy
exports.atualizarMotoboy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, telefone, endereco, dados_bancarios } = req.body;

    await pool.query(
      `UPDATE Motoboys SET nome = ?, telefone = ?, endereco = ?, dados_bancarios = ? WHERE id_motoboys = ?`,
      [nome, telefone, endereco, dados_bancarios, id]
    );

    res.json({ success: true, message: 'Motoboy atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Deletar motoboy
exports.deletarMotoboy = async (req, res, next) => {
  try {
    const { id } = req.params;

// Verifica se há pedidos atribuídos a este motoboy
    const [pedidos] = await pool.query('SELECT COUNT(*) AS total FROM Pedidos WHERE motoboy_id = ?', [id]);
    if (pedidos[0].total > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível deletar o motoboy. Existem pedidos associados a este motoboy.'
      });
    }

    // Se não houver pedidos associados, pode deletar
    await pool.query('DELETE FROM Motoboys WHERE id_motoboys = ?', [id]);

    res.json({ success: true, message: 'Motoboy deletado com sucesso' });
  } catch (err) {
    next(err);
  }
};