const express = require('express');
const router = express.Router();
const motoboyController = require('../controllers/motoboyController');
const auth = require('../middlewares/authMiddleware');

// Criar novo motoboy
router.post('/motoboys', auth, motoboyController.criarMotoboy);

// Listar todos os motoboys
router.get('/motoboys', auth, motoboyController.listarMotoboys);

// Atualizar motoboy por ID
router.put('/motoboys/:id', auth, motoboyController.atualizarMotoboy);

// Deletar motoboy por ID
router.delete('/motoboys/:id', auth, motoboyController.deletarMotoboy);

module.exports = router;
