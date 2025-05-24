const express = require('express');
const session = require('express-session'); // Adicionado para gerenciar sessões
const Keycloak = require('keycloak-connect'); // Middleware do Keycloak

// Configuração do Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const veiculos_router = require('./routers/veiculos/router');
const usuarios_router = require('./routers/usuarios/router');
const vendas_router = require('./routers/vendas/router');

const app = express();
app.use(express.json());

// Configuração de sessão
app.use(session({
    secret: '123', // Substitua por uma chave segura
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Middleware do Keycloak
app.use(keycloak.middleware());

// Rotas públicas
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à API de Gestão de Veículos!');
});

app.get('/logout', (req, res) => {
    const keycloakLogoutUrl = 'http://localhost:8080/realms/postech-fase3/protocol/openid-connect/logout';
    const redirectUri = 'http://localhost:3000'; // URL para onde o usuário será redirecionado após o logout
    res.redirect(`${keycloakLogoutUrl}?redirect_uri=${redirectUri}`);
});

app.get('/callback', (req, res) => {
    // Exemplo: Processar o callback do Keycloak
    res.status(200).json({ message: 'Callback recebido com sucesso!', query: req.query });
});

// Rotas protegidas
app.use('/veiculos', keycloak.protect(), veiculos_router);
app.use('/usuarios', keycloak.protect(), usuarios_router);
app.use('/vendas', keycloak.protect(), vendas_router);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});