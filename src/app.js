const express = require('express');

const veiculos_router = require('./routers/veiculos/router');
const usuarios_router = require('./routers/usuarios/router');
const vendas_router = require('./routers/vendas/router');

const app = express();
app.use(express.json());

// Rota
app.use('/veiculos', veiculos_router);
app.use('/usuarios', usuarios_router);
app.use('/vendas', vendas_router);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});