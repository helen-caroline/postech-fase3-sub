const model = require('../veiculos/model');

// Simulação de banco de dados para vendas
let vendas = [];

// Registrar venda
const registrarVenda = (veiculoId, usuarioId) => {
    const novaVenda = {
        id: vendas.length + 1,
        veiculoId,
        usuarioId,
        data: new Date()
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