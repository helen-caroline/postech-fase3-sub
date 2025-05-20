// Simulação de banco de dados para vendas
let vendas = [];

// Função para registrar uma venda
const registrarVenda = (venda) => {
    const novaVenda = {
        id: vendas.length + 1,
        ...venda,
        data: new Date().toISOString() // Adiciona a data da venda
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