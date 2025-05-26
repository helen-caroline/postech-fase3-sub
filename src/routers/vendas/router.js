const express = require('express');
const router = express.Router();
const controller = require('../../controllers/vendas/controller');

// Rota para registrar uma nova venda
router.get('/sales', controller.listarVendasController);

// Rota para listar todas as vendas
router.post('/buy', controller.registrarVendaController);

module.exports = router;