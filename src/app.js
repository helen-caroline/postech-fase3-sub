const express = require('express');

const keycloack_router = require('./routers/keycloack/router').router;
const veiculos_router = require('./routers/veiculos/router');
const usuarios_router = require('./routers/usuarios/router');
const vendas_router = require('./routers/vendas/router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas públicas
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à API de Gestão de Veículos!');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Rotas do Keycloak
app.use('/keycloak', keycloack_router);

// Rotas protegidas
app.use('/veiculos', veiculos_router);
app.use('/usuarios', usuarios_router);
app.use('/vendas', vendas_router);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});