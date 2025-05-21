const express = require('express');
const router = express.Router();
const controller = require('../../controllers/vendas/controller');
const middleware = require('../../middleware/vendas/middleware');

// GET
router.get('/viewer', controller.listarVendas);

// POST
router.post('/create', middleware.validarDadosVenda, controller.registrarVenda);
router.post('/buy', middleware.validarDadosVenda, controller.registrarVenda);

module.exports = router;