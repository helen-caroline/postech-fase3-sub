const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const axios = require('axios');
const qs = require('qs');

// Configuração do Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const router = express.Router();

// Variáveis fixas
const HOSTNAME = 'http://localhost:8080'; // Substitua pelo seu hostname
const REALM = 'prod'; // Substitua pelo seu realm
const CLIENT_ID = 'api-veiculos'; // Substitua pelo seu client_id
const CLIENT_SECRET = '9URsAGle3YxjvZPxbGHGr562sdG8Dult'; // Substitua pelo seu client_secret

// Middleware de sessão
router.use(session({
    secret: '123', // Substitua por uma chave segura
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Middleware do Keycloak
router.use(keycloak.middleware());

// Rota para autenticação (login)
router.post('/login', async(req, res) => {
    try {
        const data = qs.stringify({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

        const response = await axios.post(`${HOSTNAME}/realms/${REALM}/protocol/openid-connect/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = response.data;

        // Simulando o comportamento do Postman para armazenar o token
        req.session.access_token = access_token;

        res.status(200).json({ access_token });
    } catch (error) {
        console.error('Erro ao obter o token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao obter o token de acesso' });
    }
});

// Exporta o roteador e o middleware do Keycloak
module.exports = { router, keycloak };