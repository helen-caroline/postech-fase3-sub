const model = require('../../models/veiculos/model');

// GET
const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await model.listarVeiculos();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar veículos.', detalhes: error.message });
    }
};

const listarVeiculosDisponiveis = async (req, res) => {
    try {
        const veiculos = await model.listarVeiculosDisponiveis();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar veículos disponíveis.', detalhes: error.message });
    }
};

const listarVeiculosVendidos = async (req, res) => {
    try {
        const veiculos = await model.listarVeiculosVendidos();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar veículos vendidos.', detalhes: error.message });
    }
};

// POST
const cadastrarVeiculo = async (req, res) => {
    const { marca, modelo, ano, cor, preco } = req.body;

    // Validação básica
    if (!marca || !modelo || !ano || !cor || !preco) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    try {
        const veiculo = await model.adicionarVeiculo({ marca, modelo, ano, cor, preco });
        res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!', veiculo });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao cadastrar veículo.', detalhes: error.message });
    }
};

// PUT
const editarVeiculo = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const veiculoAtualizado = await model.editarVeiculo(parseInt(id), dadosAtualizados);

        if (!veiculoAtualizado) {
            return res.status(404).json({ erro: 'Veículo não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Veículo atualizado com sucesso!', veiculo: veiculoAtualizado });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar veículo.', detalhes: error.message });
    }
};

module.exports = {
    listarVeiculos,
    cadastrarVeiculo,
    editarVeiculo,
    listarVeiculosDisponiveis,
    listarVeiculosVendidos,
};