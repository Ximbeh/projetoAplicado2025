// loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login único para qualquer tipo de usuário
router.post('/login', loginController.login);

module.exports = router;