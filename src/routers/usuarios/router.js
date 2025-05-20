const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/controller');

// GET
router.get('/viewer', controller.listarUsuarios);

// POST
router.post('/create', controller.cadastrarUsuario);

// PUT

module.exports = router;