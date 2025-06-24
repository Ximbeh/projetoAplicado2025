const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios' });
    }

    const [usuarios] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
    }

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });
  } catch (err) {
    next(err);
  }
};
