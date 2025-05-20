const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/controller');
const middleware = require('../../middleware/usuarios/middleware');

// GET
router.get('/viewer', controller.listarUsuarios);

// POST
router.post('/create', middleware.validarDadosUsuario, middleware.verificarUsuarioExistente, controller.cadastrarUsuario);

// PUT

module.exports = router;