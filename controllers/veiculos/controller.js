const veiculos_model = require('../../models/veiculos/model');
const usuarios_model = require('../../models/usuarios/model');

// GET
const listarVeiculos = (req, res) => {
    const veiculos = veiculos_model.listarVeiculos();
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
    const veiculo = veiculos_model.adicionarVeiculo({ marca, modelo, ano, cor, preco });

    res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!', veiculo });
};

// PUT
const editarVeiculo = (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const veiculoAtualizado = veiculos_model.editarVeiculo(parseInt(id), dadosAtualizados);

    if (!veiculoAtualizado) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Veículo atualizado com sucesso!', veiculo: veiculoAtualizado });
};

// POST - Comprar veículo
const comprarVeiculo = (req, res) => {
    const { usuarioId, veiculoId } = req.body;

    // Verificar se o usuário está cadastrado
    const usuario = usuarios_model.verificarUsuario(usuarioId);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Marcar o veículo como vendido
    const veiculo = veiculos_model.venderVeiculo(parseInt(veiculoId));
    if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado ou já vendido.' });
    }

    res.status(200).json({ mensagem: 'Compra realizada com sucesso!', veiculo });
};


module.exports = {
    listarVeiculos,
    cadastrarVeiculo,
    editarVeiculo,
    comprarVeiculo,
};