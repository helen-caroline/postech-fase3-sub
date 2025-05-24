const express = require('express');

const veiculos_router = require('./routers/veiculos/router');
const usuarios_router = require('./routers/usuarios/router');
const vendas_router = require('./routers/vendas/router');

const app = express();
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à API de Gestão de Veículos!')
});
app.get('/logout', (req, res) => {
    // Se estiver usando Keycloak, redirecione para a URL de logout
    const keycloakLogoutUrl = 'http://localhost:8080/realms/postech-fase3/protocol/openid-connect/logout';
    res.redirect(keycloakLogoutUrl);
});
app.get('/callback', (req, res) => {
    // Exemplo: Processar o callback do provedor de autenticação
    res.status(200).send('Callback recebido com sucesso!');
});

// Rotas de aplicação
app.use('/veiculos', veiculos_router);
app.use('/usuarios', usuarios_router);
app.use('/vendas', vendas_router);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});