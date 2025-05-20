const veiculos_model = require('../../models/veiculos/model');
const usuarios_model = require('../../models/usuarios/model');
const vendas_model = require('../../models/vendas/model');

// GET
const listarVeiculos = (req, res) => {
    const veiculos = veiculos_model.listarVeiculos();
    res.status(200).json(veiculos);
};

const listarVeiculosDisponiveis = (req, res) => {
    const veiculos = veiculos_model.listarVeiculosDisponiveis();
    res.status(200).json(veiculos);
};

const listarVeiculosVendidos = (req, res) => {
    const veiculos = veiculos_model.listarVeiculosVendidos();
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

const comprarVeiculo = (req, res) => {
    const veiculoId = req.body.veiculoId;
    const compradorId = req.compradorId; // ID do comprador autenticado

    // Verificar se o comprador está cadastrado
    const usuario = usuarios_model.verificarUsuario(compradorId);
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Verificar se o veículo está disponível
    const veiculo = veiculos_model.verificarVeiculoDisponivel(veiculoId);
    if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado ou já vendido.' });
    }

    // Marcar o veículo como vendido
    const veiculoVendido = veiculos_model.venderVeiculo(veiculoId);

    // Registrar a venda
    const venda = vendas_model.registrarVenda({
        compradorId,
        veiculoId
    });

    // Formatar a data para UTC do Brasil
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date());

    // Atualizar a data da venda
    venda.data = dataFormatada;

    // Retornar a resposta com os dados do comprador
    res.status(200).json({
        mensagem: 'Compra realizada com sucesso!',
        venda,
        veiculo: veiculoVendido,
        comprador: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
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




module.exports = {
    listarVeiculos,
    cadastrarVeiculo,
    editarVeiculo,
    comprarVeiculo,
    listarVeiculosDisponiveis,
    listarVeiculosVendidos
};