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

async function introspectToken(token) {
    const data = qs.stringify({
        token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    try {
        const response = await axios.post(`${HOSTNAME}/realms/${REALM}/protocol/openid-connect/token/introspect`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao introspectar o token:', error.response?.data || error.message);
        throw error;
    }
}

async function logoutUser(refresh_token) {
    const data = qs.stringify({
        refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });
    try {
        const response = await axios.post(`${HOSTNAME}/realms/${REALM}/protocol/openid-connect/logout`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer o logout com o refresh_token:', error.response?.data || error.message);
        throw error;
    }
}


module.exports = { 
    getClientCredentialsToken, 
    getPasswordGrantToken,
    introspectToken,
    logoutUser
};