const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header está presente e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo123');

    // Anexa os dados decodificados ao request
    req.usuario = decoded; // Inclui id, email, tipo, entregador, etc.
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token inválido ou expirado' });
  }
};
