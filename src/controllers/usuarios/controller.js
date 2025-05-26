const axios = require('axios');

// Defina o HOSTNAME_API e HOSTNAME_KEYCLOAK com os valores corretos
const HOSTNAME_API = 'http://localhost:3000';
const HOSTNAME_KEYCLOAK = 'http://localhost:8080'; // Ajuste conforme necessário
const REALM = 'prod'; // Substitua pelo nome do seu realm

const createUserController = async (req, res) => {
    try {
        // Obter o token diretamente da nova rota simplificada sem passar dados
        const tokenResponse = await axios.post(`${HOSTNAME_API}/keycloak/login`);
        const accessToken = tokenResponse.data.access_token;
        console.log("Token obtido:", accessToken); // Adicione este log

        // Dados do usuário a serem criados (vindo do corpo da requisição)
        const userData = req.body;

        // Enviar requisição para criar o usuário no Keycloak
        const createUserResponse = await axios.post(
            `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Usuário criado com sucesso:", createUserResponse.data);

        // Enviar uma resposta ao cliente
        res.status(201).json({ message: 'Usuário criado com sucesso', user: createUserResponse.data });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao criar o usuário', details: error.response?.data || error.message });
    }
};

// Exporta o controlador
module.exports = { createUserController };