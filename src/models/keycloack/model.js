const axios = require('axios');
const qs = require('qs');

const HOSTNAME = 'http://localhost:8080'; // Substitua pelo seu hostname
const REALM = 'prod'; // Substitua pelo seu realm
const CLIENT_ID = 'api-veiculos'; // Substitua pelo seu client_id
const CLIENT_SECRET = '9URsAGle3YxjvZPxbGHGr562sdG8Dult'; // Substitua pelo seu client_secret

async function getClientCredentialsToken() {
    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    try {
        const response = await axios.post(`${HOSTNAME}/realms/${REALM}/protocol/openid-connect/token`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição ao Keycloak:', error.response?.data || error.message);
        throw error;
    }
}

async function getPasswordGrantToken(username, password) {
    const data = qs.stringify({
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username,
        password,
    });

    const response = await axios.post(`${HOSTNAME}/realms/${REALM}/protocol/openid-connect/token`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
}

module.exports = { getClientCredentialsToken, getPasswordGrantToken };