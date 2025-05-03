// Simulação de banco de dados
let veiculos = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        ano: 2020,
        cor: "Prata",
        preco: 75000,
        vendido: false
    },
    {
        id: 2,
        marca: "Honda",
        modelo: "Civic",
        ano: 2019,
        cor: "Preto",
        preco: 85000,
        vendido: false
    },
    {
        id: 3,
        marca: "Fiat",
        modelo: "Uno",
        ano: 2015,
        cor: "Branco",
        preco: 25000,
        vendido: true
    },
    {
        id: 4,
        marca: "Ford",
        modelo: "Ka",
        ano: 2018,
        cor: "Vermelho",
        preco: 30000,
        vendido: false
    }
];

// GET
const listarVeiculos = () => {
    return veiculos;
};

const listarVeiculosDisponiveis = () => {
    return veiculos
        .filter(veiculo => !veiculo.vendido) // Filtra veículos não vendidos
        .sort((a, b) => a.preco - b.preco); // Ordena por preço (crescente)
};

const listarVeiculosVendidos = () => {
    return veiculos
        .filter(veiculo => veiculo.vendido) // Filtra veículos vendidos
        .sort((a, b) => a.preco - b.preco); // Ordena por preço (crescente)
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
    listarVeiculosDisponiveis,
    listarVeiculosVendidos
};