const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login para usuário comum (cliente/admin)
exports.loginUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const [[usuario]] = await pool.query(
      'SELECT * FROM Usuarios WHERE email = ? AND tipo IN (?, ?)',
      [email, 'cliente', 'admin']
    );

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const payload = {
      id: usuario.id_usuario,
      nome: usuario.nome,
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      email: usuario.email,
      entregador: false,
      tipo: usuario.tipo
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'segredo123', {
      expiresIn: '2h'
    });

    res.json({ success: true, token, usuario: payload });
  } catch (err) {
    next(err);
  }
};

// Login para motoboy
exports.loginMotoboy = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const [[motoboy]] = await pool.query(
      'SELECT * FROM Usuarios WHERE email = ? AND tipo = ?',
      [email, 'motoboy']
    );

    if (!motoboy) {
      return res.status(404).json({ success: false, message: 'Motoboy não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, motoboy.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const payload = {
      id: motoboy.id_usuario,
      nome: motoboy.nome,
      cpf: motoboy.cpf,
      telefone: motoboy.telefone,
      email: motoboy.email,
      tipoVeiculo: motoboy.tipo_veiculo,
      placa: motoboy.placa_moto,
      chassi: motoboy.chassi,
      cnh: motoboy.cnh,
      entregador: true,
      tipo: motoboy.tipo
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'segredo123', {
      expiresIn: '2h'
    });

    res.json({ success: true, token, usuario: payload });
  } catch (err) {
    next(err);
  }
};
