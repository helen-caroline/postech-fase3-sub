const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const HOSTNAME = process.env.HOSTNAME;
const REALM = process.env.REALM;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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