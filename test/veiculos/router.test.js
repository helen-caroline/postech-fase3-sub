// routers/veiculos/router.test.js
const request = require('supertest');
const express = require('express');
const veiculosRouter = require('../../routers/veiculos/router');

const app = express();
app.use(express.json());
app.use('/veiculos', veiculosRouter);

describe('Testes para as rotas de veículos', () => {
    test('GET /veiculos/viewer deve listar veículos', async () => {
        const response = await request(app).get('/veiculos/viewer');
        expect(response.status).toBe(200);
        // Adicione mais verificações conforme necessário
    });

    test('GET /veiculos/available deve listar veículos disponíveis', async () => {
        const response = await request(app).get('/veiculos/available');
        expect(response.status).toBe(200);
        // Adicione mais verificações conforme necessário
    });

    test('POST /veiculos/create deve cadastrar um veículo', async () => {
        const novoVeiculo = {
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2023,
            cor: 'Branco',
            preco: 120000
        };
        const response = await request(app).post('/veiculos/create').send(novoVeiculo);
        expect(response.status).toBe(201); // Supondo que o status de sucesso seja 201
        // Adicione mais verificações conforme necessário
    });

    test('PUT /veiculos/update/:id deve atualizar um veículo', async () => {
        const veiculoAtualizado = { modelo: 'Carro Y', ano: 2023 };
        const response = await request(app).put('/veiculos/update/1').send(veiculoAtualizado);
        expect(response.status).toBe(200);
        // Adicione mais verificações conforme necessário
    });
});