const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const axios = require('axios');
const qs = require('qs');

// Configuração do Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const router = express.Router();

// Middleware de sessão
router.use(session({
    secret: '123', // Substitua por uma chave segura
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Middleware do Keycloak
router.use(keycloak.middleware());

// Rota para login
router.get('/login', async (req, res) => {
    try {
        const data = qs.stringify({
            username: 'spiderman',
            password: '123456',
            client_id: 'api-veiculos',
            client_secret: 'suwnoeEGbvJJdzpdDrViVjKtJwdEKYsh',
            grant_type: 'password',
        });

        const response = await axios.post('http://localhost:8080/realms/dev/protocol/openid-connect/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;
        res.status(200).json({ access_token, refresh_token });
    } catch (error) {
        console.error('Erro ao obter o token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao obter o token de acesso' });
    }
});

// Rota para introspect
router.post('/introspect', async (req, res) => {
    try {
        const { client_id, client_secret, token } = req.body;

        if (!client_id || !client_secret || !token) {
            return res.status(400).json({ error: 'Parâmetros ausentes: client_id, client_secret e token são obrigatórios.' });
        }

        const data = new URLSearchParams({
            client_id,
            client_secret,
            token
        });

        const response = await axios.post(
            'http://localhost:8080/realms/dev/protocol/openid-connect/token/introspect',
            data.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { active } = response.data;
        res.status(200).json({ active });
    } catch (error) {
        console.error('Erro ao introspectar o token:', error.message);
        res.status(500).json({ error: 'Erro ao introspectar o token' });
    }
});

// Rota para logout
router.post('/logout', async (req, res) => {
    try {
        const data = qs.stringify({
            refresh_token: 'eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhNTg3YzY0Zi1kY2FlLTQ4ZmUtOWNhNy0wZGU1Y2FjMTBiOGIifQ.eyJleHAiOjE3NDgyMTc2MDgsImlhdCI6MTc0ODIxNTgwOCwianRpIjoiMGI1MjNkZTYtNGUwMi00MGY4LWE4MTEtMzE4YTU3ZjRiM2U0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kZXYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2RldiIsInN1YiI6ImY1NDI2YjFiLWJhNjMtNDZjZi1iYzAzLTc5Mjk4OTYzNTI0MSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhcGktdmVpY3Vsb3MiLCJzaWQiOiIwYzQyYjQxYi00MDQ4LTRlMTMtOGVmZS1kMzVhMGNhNWFkY2UiLCJzY29wZSI6ImVtYWlsIHdlYi1vcmlnaW5zIHByb2ZpbGUgcm9sZXMgYWNyIGJhc2ljIn0.1ITom46IiROoiU1Wbtdo4gckQ9WBn4uEyUR-DNxjNxWjfPC3Id8jkP8-4d_QuEXbw_pKtOpnrntI0Mwok5ZXOw',
            client_id: 'api-veiculos',
            client_secret: 'suwnoeEGbvJJdzpdDrViVjKtJwdEKYsh',
        });

        const response = await axios.post('http://localhost:8080/realms/dev/protocol/openid-connect/logout', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 204) {
            res.status(200).json({ message: 'Logout realizado com sucesso.' });
        } else {
            res.status(response.status).json({ message: 'Logout processado, mas com resposta inesperada.', data: response.data });
        }
    } catch (error) {
        console.error('Erro ao realizar logout:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: 'Erro ao realizar logout.', details: error.response?.data || error.message });
    }
});

// Exporta o roteador e o middleware do Keycloak
module.exports = { router, keycloak };