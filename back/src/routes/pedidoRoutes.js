const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/authMiddleware');

// Criar novo pedido
router.post('/pedidos', auth, pedidoController.criarPedido);

// Listar todos os pedidos
router.get('/pedidos', auth, pedidoController.listarPedidos);

// Atualizar status de pedido e registrar no histórico
router.put('/pedidos/status', auth, pedidoController.atualizarStatus);

// Consultar histórico de um pedido específico
router.get('/pedidos/:id_pedido/historico', auth, pedidoController.historicoPedido);

// Concluir pedido com comprovante (imagem base64)
router.put('/pedidos/concluir', auth, pedidoController.concluirPedido);

module.exports = router;
