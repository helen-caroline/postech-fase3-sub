const axios = require('axios');

// Defina o HOSTNAME_API e HOSTNAME_KEYCLOAK com os valores corretos
const HOSTNAME_API = 'http://localhost:3000';
const HOSTNAME_KEYCLOAK = 'http://localhost:8080'; // Ajuste conforme necessário
const REALM = 'prod'; // Substitua pelo nome do seu realm

// Função para obter o token de acesso
const getAccessToken = async () => {
    const tokenResponse = await axios.post(`${HOSTNAME_API}/keycloak/login`);
    return tokenResponse.data.access_token;
};

// Função para criar um usuário no Keycloak
const createUser = async (accessToken, userData) => {
    const response = await axios.post(
        `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

module.exports = { getAccessToken, createUser };