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

module.exports = router;
