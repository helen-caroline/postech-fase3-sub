const vendas_model = require('../../models/vendas/model');

// GET - Listar vendas
const listarVendas = (req, res) => {
    const vendas = vendas_model.listarVendas();
    res.status(200).json(vendas);
};

module.exports = {
    listarVendas
};