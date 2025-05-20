const model = require('../veiculos/model');

// Simulação de banco de dados para vendas
let vendas = [];

// Função para registrar uma venda
const registrarVenda = (idVeiculo, comprador) => {
    const veiculo = model.listarVeiculos().find(v => v.id === idVeiculo);

    if (!veiculo || veiculo.vendido) {
        return null; // Veículo não encontrado ou já vendido
    }

    // Marca o veículo como vendido
    veiculo.vendido = true;

    const novaVenda = {
        id: vendas.length + 1,
        veiculoId: idVeiculo,
        comprador,
        data: new Date().toISOString()
    };

    vendas.push(novaVenda);
    return novaVenda;
};

// Função para listar todas as vendas
const listarVendas = () => {
    return vendas;
};

module.exports = {
    registrarVenda,
    listarVendas
};