const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// Buscar todos os usuários (acesso público ou restrito, dependendo do projeto)
router.get('/user', userController.getAllUsers);

// Cadastro de novo usuário (cliente ou motoboy)
router.post('/signup', userController.cadastrarUsuario);

// Atualizar dados de usuário
router.put('/editarUsuario', auth, userController.editarUsuario);

// Deletar usuário
router.delete('/deletarUsuario', auth, userController.deletarUsuario);

// Alterar senha
router.put('/usuario/alterarSenha', auth, userController.alterarSenha);

module.exports = router;
