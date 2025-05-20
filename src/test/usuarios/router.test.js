// routers/usuarios/router.test.js
const request = require('supertest');
const express = require('express');
const usuariosRouter = require('../../routers/usuarios/router');

const app = express();
app.use(express.json());
app.use('/usuarios', usuariosRouter);

describe('Testes para as rotas de usuários', () => {
    test('GET /usuarios/viewer deve listar usuários', async () => {
        const response = await request(app).get('/usuarios/viewer');
        expect(response.status).toBe(200);
        // Adicione mais verificações conforme necessário
    });

    test('POST /usuarios/create deve cadastrar um usuário', async () => {
        const novoUsuario = { nome: 'João', email: 'joao@example.com' };
        const response = await request(app).post('/usuarios/create').send(novoUsuario);
        expect(response.status).toBe(201); // Supondo que o status de sucesso seja 201
        // Adicione mais verificações conforme necessário
    });
});