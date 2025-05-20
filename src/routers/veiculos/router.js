const express = require('express');
const router = express.Router();
const controller = require('../../controllers/veiculos/controller');

// GET
router.get('/viewer', controller.listarVeiculos);
router.get('/available', controller.listarVeiculosDisponiveis);
router.get('/sold', controller.listarVeiculosVendidos);

// POST
router.post('/create', controller.cadastrarVeiculo);
router.post('/buy', controller.comprarVeiculo);

// PUT
router.put('/update/:id', controller.editarVeiculo);

module.exports = router;