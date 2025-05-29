const vendas = []; // Array para armazenar vendas simuladas
let currentId = 1; // Inicializa o ID com 1

const registrarVenda = async (vendaData) => {
    const venda = {
        id: currentId++, // Incrementa o ID a cada nova venda
        ...vendaData,
    };
    vendas.push(venda); // Armazena a venda no array
    return venda;
};

const listarVendas = async () => {
    return vendas; // Retorna todas as vendas
};

module.exports = {
    registrarVenda,
    listarVendas,
};