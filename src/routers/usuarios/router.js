const express = require('express');
const { createUserController } = require('../../controllers/usuarios/controller');

const router = express.Router();

// Rota para criar usuário
router.post('/create', createUserController);

module.exports = router;