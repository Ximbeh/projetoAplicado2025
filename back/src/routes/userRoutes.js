const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// Rotas de usuário
router.get('/user', userController.getAllUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/editarUsuario', userController.editarUsuario);
router.delete('/deletarUsuario', userController.deletarUsuario);
router.put('/usuario/alterarSenha', auth, userController.alterarSenha);

module.exports = router;
