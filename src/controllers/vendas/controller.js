const vendasModel = require('../../models/vendas/model');
const veiculosModel = require('../../models/veiculos/model');

// GET - Listar vendas
const listarVendas = (req, res) => {
    const vendas = vendasModel.listarVendas();
    res.status(200).json(vendas);
};

// POST - Registrar venda
const registrarVenda = (req, res) => {
    const { veiculoId, comprador } = req.body;

    // Validação básica
    if (!veiculoId || !comprador) {
        return res.status(400).json({ erro: 'ID do veículo e comprador são obrigatórios.' });
    }

    // Verificar se o veículo está disponível
    const veiculo = veiculosModel.listarVeiculos().find(v => v.id === veiculoId && !v.vendido);
    if (!veiculo) {
        return res.status(400).json({ erro: 'Veículo não encontrado ou já vendido.' });
    }

    // Registrar a venda
    const novaVenda = vendasModel.registrarVenda(veiculoId, comprador);

    if (!novaVenda) {
        return res.status(500).json({ erro: 'Erro ao registrar a venda.' });
    }

    res.status(201).json({
        mensagem: 'Venda registrada com sucesso!',
        venda: novaVenda
    });
};

module.exports = {
    listarVendas,
    registrarVenda
};