const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// Listar todos os usuários
router.get('/usuarios', auth, userController.getAllUsers);

// Cadastro de novo usuário
router.post('/signup', userController.cadastrarUsuario);

// Atualizar usuário logado
router.put('/usuarios', auth, userController.editarUsuario); // edita baseado no token

// Deletar usuário logado
router.delete('/usuarios', auth, userController.deletarUsuario);

// Alterar senha do usuário logado
router.put('/usuarios/senha', auth, userController.alterarSenha);

module.exports = router;
