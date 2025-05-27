const axios = require('axios');

// Defina o HOSTNAME_API e HOSTNAME_KEYCLOAK com os valores corretos
const HOSTNAME_API = 'http://localhost:3000';
const HOSTNAME_KEYCLOAK = 'http://localhost:8080'; // Ajuste conforme necessário
const REALM = 'prod'; // Substitua pelo nome do seu realm

// Função para obter o token de acesso
const login = async () => {
    const tokenResponse = await axios.post(`${HOSTNAME_API}/keycloak/login`);
    return tokenResponse.data.access_token;
};

// Função para buscar todos os usuários no Keycloak
const getAllUsers = async (accessToken) => {
    const response = await axios.get(
        `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

// Função para buscar um usuário pelo username no Keycloak
const getUserByUsername = async (accessToken, username) => {
    const response = await axios.get(
        `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: { username }, // Passa o username como parâmetro
        }
    );
    return response.data;
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

// Função para deletar um usuário no Keycloak
const deleteUser = async (accessToken, userId) => {
    const response = await axios.delete(
        `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

// Função para atualizar um usuário no Keycloak
const updateUser = async (accessToken, userId, updateData) => {
    const response = await axios.put(
        `${HOSTNAME_KEYCLOAK}/admin/realms/${REALM}/users/${userId}`,
        updateData, // Corpo da requisição com os dados a serem atualizados
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

module.exports = { 
    login, 
    createUser,
    deleteUser,
    updateUser,
    getUserByUsername,
    getAllUsers
};