const express = require('express');
const { createUserController } = require('../../controllers/usuarios/controller');

const router = express.Router();

console.log("createUserController:", createUserController);

// Rota para criar usuário
router.post('/create', createUserController);

module.exports = router;