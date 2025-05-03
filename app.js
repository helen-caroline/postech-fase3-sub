const express = require('express');

const veiculos_router = require('./routers/veiculos/router');
const usuarios_router = require('./routers/usuarios/router');

const app = express();
app.use(express.json());

// Rota
app.use('/veiculos', veiculos_router);
app.use('/usuarios', usuarios_router);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});