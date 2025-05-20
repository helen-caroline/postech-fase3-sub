const express = require('express');
const router = express.Router();
const controller = require('../../controllers/vendas/controller');

// GET
router.get('/viwer', controller.listarVendas);

module.exports = router;