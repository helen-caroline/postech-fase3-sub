const express = require('express');
const controller = require('../../controllers/usuarios/controller');

const router = express.Router();



// Rota para criar usuário
router.post('/create', controller.createUserController);

// Rota para deletar usuário
router.delete('/delete', controller.deleteUserController);

module.exports = router;