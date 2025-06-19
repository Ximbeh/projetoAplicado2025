const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login para usuário comum (cliente ou admin)
exports.loginUsuario = async (req, res, next) => {
  try {
     console.log(req.body);
    const { email, senha } = req.body;
    const [[usuario]] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
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
      { expiresIn: '2h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

// Login para motoboy
exports.loginMotoboy = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const [[motoboy]] = await pool.query('SELECT * FROM Motoboys WHERE email = ?', [email]);

    if (!motoboy) {
      return res.status(404).json({ success: false, message: 'Motoboy não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, motoboy.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id_motoboys: motoboy.id_motoboys,
        email: motoboy.email,
        tipo: 'motoboy'
      },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '2h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
