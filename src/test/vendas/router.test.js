// routers/vendas/router.test.js
const request = require('supertest');
const express = require('express');
const vendasRouter = require('../../routers/vendas/router');

const app = express();
app.use(express.json());
app.use('/vendas', vendasRouter);

describe('Testes para as rotas de vendas', () => {
    test('GET /vendas/viwer deve listar vendas', async () => {
        const response = await request(app).get('/vendas/viwer');
        expect(response.status).toBe(200);
        // Adicione mais verificações conforme necessário
    });
});