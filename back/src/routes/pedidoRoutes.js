const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/authMiddleware');

// Criar novo pedido
router.post('/pedidos', auth, pedidoController.criarPedido);

// Listar todos os pedidos disponíveis (excluindo recusados pelo motoboy)
router.get('/pedidos', auth, pedidoController.listarPedidos);

// Aceitar pedido
router.post('/pedidos/aceitar', auth, pedidoController.aceitarPedido);

// Recusar pedido
router.post('/pedidos/recusar', auth, pedidoController.recusarPedido);

// Concluir pedido (com imagem base64)
router.put('/pedidos/concluir', auth, pedidoController.concluirPedido);

// Consultar histórico de um pedido específico
router.get('/pedidos/:id_pedido/historico', auth, pedidoController.historicoPedido);

// Rota temporaria - teste Geocode
const { buscarCoordenadas } = require('../utils/geocode');

router.get('/teste-geocode', async (req, res) => {
  const { cep, logradouro, numero } = req.query;

  try {
    const coords = await buscarCoordenadas(cep, logradouro, numero);
    res.json({ sucesso: true, coordenadas: coords });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota temporaria - teste OpenRouteService
const { calcularTempoDistancia } = require('../utils/orsService');

router.get('/teste-ors', async (req, res) => {
  const origem = { lat: -26.9182, lng: -49.0661 }; // Blumenau, por exemplo
  const destino = { lat: -26.9165, lng: -49.0714 }; // Outro ponto de Blumenau

  try {
    const resultado = await calcularTempoDistancia(origem, destino);
    res.json({ sucesso: true, resultado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
