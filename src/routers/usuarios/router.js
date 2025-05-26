const express = require('express');
const controller = require('../../controllers/usuarios/controller');

const router = express.Router();

// Rota para buscar todos os usuários
router.get('/get', controller.getAllUsersController);

// Rota para buscar usuário pelo username diretamente na URL
router.get('/get/:username', controller.getUserBYController);

// Rota para criar usuário
router.post('/create', controller.createUserController);

// Rota para deletar usuário
router.delete('/delete', controller.deleteUserController);

// Rota para atualizar usuário
router.put('/update', controller.updateUserController);

module.exports = router;