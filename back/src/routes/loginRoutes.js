const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login de usuário comum (cliente ou admin)
router.post('/login/usuario', loginController.loginUsuario);

// Login de motoboy
router.post('/login/motoboy', loginController.loginMotoboy);

module.exports = router;
