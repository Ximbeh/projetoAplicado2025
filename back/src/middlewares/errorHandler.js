module.exports = (err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Erro interno no servidor'
  });
};