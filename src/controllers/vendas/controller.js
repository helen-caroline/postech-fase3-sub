const model = require('../../models/vendas/model');
const model_veiculos = require('../../models/veiculos/model');
const model_usuarios = require('../../models/usuarios/model');

const registrarVendaController = async (req, res) => {
    try {
        const { username, veiculoId } = req.body;

        // Validar os dados da requisição
        if (!username || !veiculoId) {
            return res.status(400).json({ erro: 'Username e ID do veículo são obrigatórios.' });
        }

        // Obter o token de acesso
        const accessToken = await model_usuarios.login();

        // Buscar o usuário pelo username no Keycloak
        const usuarios = await model_usuarios.getUserByUsername(accessToken, username);
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado no Keycloak.' });
        }
        const usuarioId = usuarios[0].id;

        // Verificar se o veículo está disponível
        const veiculos = await model_veiculos.listarVeiculos();
        const veiculo = veiculos.find(v => v.id === veiculoId && !v.vendido);
        if (!veiculo) {
            return res.status(400).json({ erro: 'Veículo não disponível para venda.' });
        }

        // Registrar a venda
        const venda = await model.registrarVenda({
            veiculoId,
            usuarioId,
            data: new Date(),
        });

        // Atualizar o status do veículo para "vendido"
        const veiculoAtualizado = await model_veiculos.editarVeiculo(veiculoId, { vendido: true });

        // Retornar a resposta
        res.status(201).json({
            mensagem: 'Venda registrada com sucesso!',
            venda,
            veiculo: veiculoAtualizado,
        });
    } catch (error) {
        console.error('Erro ao registrar a venda:', error.message);
        res.status(500).json({ erro: 'Erro ao registrar a venda.', detalhes: error.message });
    }
};

const listarVendasController = async (req, res) => {
    try {
        const vendas = await model.listarVendas();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao listar as vendas:', error.message);
        res.status(500).json({ erro: 'Erro ao listar as vendas.', detalhes: error.message });
    }
};

module.exports = {
    registrarVendaController,
    listarVendasController
};