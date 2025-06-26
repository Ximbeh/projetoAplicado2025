// src/routes/pedidoRoutes.js
const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const auth = require("../middlewares/authMiddleware");

// Cliente - Criar novo pedido (com cálculo automático)
router.post("/pedidos", auth, pedidoController.criarPedido);

// Cliente - Ver pedidos em andamento
router.get(
  "/pedidos/cliente/andamento",
  auth,
  pedidoController.pedidosEmAndamentoCliente
);

// Cliente ver um pedido específico
router.get('/pedidos/ativos-cliente', auth, pedidoController.pedidosAtivosCliente);

// Cliente - Ver histórico de pedidos
router.get(
  "/pedidos/cliente/historico",
  auth,
  pedidoController.historicoCliente
);

// Motoboy - Listar pedidos disponíveis (não recusados ainda)
router.get("/pedidos", auth, pedidoController.listarPedidos);

// Motoboy - Ver pedidos Aceitos/ativos
router.get(
  "/pedidos/motoboy/ativos",
  auth,
  pedidoController.pedidosAtivosMotoboy
);

// Motoboy - Ver histórico de entregas
router.get(
  "/pedidos/motoboy/historico",
  auth,
  pedidoController.historicoMotoboy
);

// Motoboy - Aceitar pedido
router.post("/pedidos/aceitar", auth, pedidoController.aceitarPedido);

// Motoboy - Recusar pedido
router.post("/pedidos/recusar", auth, pedidoController.recusarPedido);

// Motoboy - Mudar status para "EmTransito"
router.put("/pedidos/motoboy/status", auth, pedidoController.mudarStatusPedido);

// Motoboy - Concluir pedido com imagem base64
router.put("/pedidos/concluir", auth, pedidoController.concluirPedido);

// Todos - Consultar histórico de um pedido específico
router.get(
  "/pedidos/:id_pedido/historico",
  auth,
  pedidoController.historicoPedido
);

// Calcular valor estimado (sem criar pedido ainda)
router.post("/pedidos/calcular", pedidoController.calcularValorPedido);



module.exports = router;
