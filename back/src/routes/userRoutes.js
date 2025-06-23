const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// Rotas de usuários
router.get('/user', userController.getAllUsers);
router.post('/signup', userController.signup);
router.put('/editarUsuario', auth, userController.editarUsuario);
router.delete('/deletarUsuario', auth, userController.deletarUsuario);
router.put('/usuario/alterarSenha', auth, userController.alterarSenha);

module.exports = router