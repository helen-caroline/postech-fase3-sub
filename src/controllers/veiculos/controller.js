const model = require('../../models/veiculos/model');

// GET
const listarVeiculos = (req, res) => {
    const veiculos = model.listarVeiculos();
    res.status(200).json(veiculos);
};

const listarVeiculosDisponiveis = (req, res) => {
    const veiculos = model.listarVeiculosDisponiveis();
    res.status(200).json(veiculos);
};

const listarVeiculosVendidos = (req, res) => {
    const veiculos = model.listarVeiculosVendidos();
    res.status(200).json(veiculos);
};

// POST
const cadastrarVeiculo = (req, res) => {
    const { marca, modelo, ano, cor, preco } = req.body;

    // Validação básica
    if (!marca || !modelo || !ano || !cor || !preco) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Adicionar veículo ao "banco de dados"
    const veiculo = model.adicionarVeiculo({ marca, modelo, ano, cor, preco });

    res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!', veiculo });
};

// PUT
const editarVeiculo = (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const veiculoAtualizado = model.editarVeiculo(parseInt(id), dadosAtualizados);

    if (!veiculoAtualizado) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Veículo atualizado com sucesso!', veiculo: veiculoAtualizado });
};




module.exports = {
    listarVeiculos,
    cadastrarVeiculo,
    editarVeiculo,
    listarVeiculosDisponiveis,
    listarVeiculosVendidos
};