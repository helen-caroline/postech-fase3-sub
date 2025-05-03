const express = require('express');
const router = express.Router();
const controller = require('../../controllers/veiculos/controller');

// GET
router.get('/viewer', controller.listarVeiculos);

// POST
router.post('/create', controller.cadastrarVeiculo);

// PUT
router.put('/update/:id', controller.editarVeiculo);

module.exports = router;