// Simulação de banco de dados
let veiculos = [];

// GET
const listarVeiculos = () => {
    return veiculos;
};

// POST
const adicionarVeiculo = (veiculo) => {
    const novoVeiculo = {
        id: veiculos.length + 1,
        vendido: false, // Adiciona o campo "vendido"
        ...veiculo
    };
    veiculos.push(novoVeiculo);
    return novoVeiculo;
};

// PUT
const editarVeiculo = (id, dadosAtualizados) => {
    const index = veiculos.findIndex(veiculo => veiculo.id === id);
    if (index === -1) {
        return null;
    }
    veiculos[index] = { ...veiculos[index], ...dadosAtualizados };
    return veiculos[index];
};

// Função para marcar um veículo como vendido
const venderVeiculo = (id) => {
    const index = veiculos.findIndex(veiculo => veiculo.id === id);
    if (index === -1 || veiculos[index].vendido) {
        return null; // Veículo não encontrado ou já vendido
    }
    veiculos[index].vendido = true;
    return veiculos[index];
};

module.exports = { 
    listarVeiculos,
    adicionarVeiculo,
    editarVeiculo,
    venderVeiculo,
};