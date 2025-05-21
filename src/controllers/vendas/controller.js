const vendasModel = require('../../models/vendas/model');
const veiculosModel = require('../../models/veiculos/model');

// GET - Listar vendas
const listarVendas = (req, res) => {
    const vendas = vendasModel.listarVendas();
    res.status(200).json(vendas);
};

// POST - Registrar venda
const registrarVenda = (req, res) => {
    try {
        const { veiculoId, usuarioId } = req.body;

        if (!veiculoId || !usuarioId) {
            return res.status(400).json({ erro: 'ID do veículo e ID do usuário são obrigatórios.' });
        }

        const veiculo = veiculosModel.listarVeiculos().find(v => v.id === veiculoId && !v.vendido);
        if (!veiculo) {
            return res.status(400).json({ erro: 'Veículo não encontrado ou já vendido.' });
        }

        const veiculoAtualizado = veiculosModel.editarVeiculo(veiculoId, { vendido: true });
        if (!veiculoAtualizado) {
            console.error('Erro ao atualizar o veículo.');
            return res.status(500).json({ erro: 'Erro ao atualizar o status do veículo.' });
        }

        const novaVenda = vendasModel.registrarVenda(veiculoId, usuarioId);
        if (!novaVenda) {
            console.error('Erro ao registrar a venda.');
            return res.status(500).json({ erro: 'Erro ao registrar a venda.' });
        }

        res.status(201).json({
            mensagem: 'Venda registrada com sucesso!',
            venda: novaVenda,
            veiculo: veiculoAtualizado
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({ erro: 'Erro inesperado no servidor.' });
    }
};

module.exports = {
    listarVendas,
    registrarVenda
};