const axios = require('axios');
const model = require('../../models/usuarios/model'); // Para acessar o Keycloak

// Defina o HOSTNAME_API e HOSTNAME_KEYCLOAK com os valores corretos
const HOSTNAME_API = 'http://localhost:3000';
const HOSTNAME_KEYCLOAK = 'http://localhost:8080'; // Ajuste conforme necessário
const REALM = 'prod'; // Substitua pelo nome do seu realm

const registrarVenda = async (req, res) => {
    try {
        console.log('Corpo da requisição recebido:', req.body); // Log para depuração

        // Obter o token de acesso do Keycloak
        const accessToken = await model.getAccessToken();

        // Obter o username e o ID do veículo do corpo da requisição
        const { username, veiculoId } = req.body;

        // Validar se os campos obrigatórios foram fornecidos
        if (!username || !veiculoId) {
            return res.status(400).json({ erro: 'ID do veículo e ID do usuário são obrigatórios.' });
        }

        // Buscar o ID do usuário no Keycloak pelo username
        const userResponse = await axios.get(
            `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users?username=${username}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (userResponse.data.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado no Keycloak.' });
        }

        const userId = userResponse.data[0].id; // Obter o ID do usuário

        // Registrar a venda associando o usuário ao veículo
        const venda = {
            userId,
            veiculoId,
            data: new Date(),
        };

        console.log('Venda registrada:', venda);

        // Retornar sucesso
        res.status(201).json({ mensagem: 'Venda registrada com sucesso.', venda });
    } catch (error) {
        console.error('Erro ao registrar a venda:', error.response?.data || error.message);
        res.status(500).json({ erro: 'Erro ao registrar a venda.', detalhes: error.response?.data || error.message });
    }
};

module.exports = { registrarVenda };