const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

// Listar todos os usuários
router.get("/usuarios", auth, userController.getAllUsers);

// Pega um usuario baseado no id
router.get("/usuarios/:id", auth, userController.getUserById);

// Cadastro de novo usuário
router.post("/signup", userController.cadastrarUsuario);

// Atualizar usuário logado
router.put("/usuarios", auth, userController.editarUsuario); // edita baseado no token

// Deletar usuário logado
router.delete("/usuarios", auth, userController.deletarUsuario);

// Alterar senha do usuário logado
router.put("/usuarios/senha", auth, userController.alterarSenha);

// Editar perfil do usuário (cliente ou motoboy)
router.put("/usuarios/:id", auth, userController.editarPerfil);

module.exports = router;
