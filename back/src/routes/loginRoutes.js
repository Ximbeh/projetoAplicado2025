const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota para login de usuário comum (cliente/admin)
router.post('/login/usuario', loginController.loginUsuario);

// Rota para login de motoboy
router.post('/login/motoboy', loginController.loginMotoboy);

module.exports = router;
