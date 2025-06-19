const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/authMiddleware');

// Criar novo pedido
router.post('/pedidos', auth, pedidoController.criarPedido);

// Listar todos os pedidos
router.get('/pedidos', auth, pedidoController.listarPedidos);

// Filtrar pedidos por cliente, motoboy ou status
router.get('/pedidos/filtro', auth, pedidoController.filtrarPedidos);

// Atualizar status de pedido e salvar histórico
router.put('/pedidos/status', auth, pedidoController.atualizarStatus);

// Ver histórico de um pedido
router.get('/pedidos/:id_pedido/historico', auth, pedidoController.historicoPedido);

// Concluir pedido (enviar imagem base64 + marcar como entregue)
router.put('/pedidos/concluir', auth, pedidoController.concluirPedido);

module.exports = router;
