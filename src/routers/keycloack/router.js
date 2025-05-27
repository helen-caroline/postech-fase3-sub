const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const controller = require('../../controllers/keycloack/controller');

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const router = express.Router();

// Middleware de sessão
router.use(session({
    secret: '123', // Substitua por uma chave segura
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

// Middleware do Keycloak
router.use(keycloak.middleware());

// Rotas
router.post('/login', controller.loginClientCredentials);
router.post('/login/:username', controller.loginWithPassword);

module.exports = { router, keycloak };