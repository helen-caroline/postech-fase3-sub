const request = require('supertest');
const express = require('express');
const veiculosRouter = require('../../routers/veiculos/router');
const veiculosModel = require('../../models/veiculos/model');

jest.mock('../../models/veiculos/model', () => ({
    listarVeiculos: jest.fn(),
    listarVeiculosDisponiveis: jest.fn(),
    listarVeiculosVendidos: jest.fn(),
    adicionarVeiculo: jest.fn(),
    editarVeiculo: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/veiculos', veiculosRouter);

describe('Testes para as rotas de veículos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Testes para GET /viewer
    test('GET /veiculos/viewer deve retornar a lista de veículos', async () => {
        const veiculos = [
            { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2023, cor: 'Branco', preco: 120000 },
            { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2022, cor: 'Preto', preco: 110000 },
        ];
        veiculosModel.listarVeiculos.mockReturnValue(veiculos);

        const response = await request(app).get('/veiculos/viewer');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(veiculos);
    });

    // Testes para GET /available
    test('GET /veiculos/available deve retornar a lista de veículos disponíveis', async () => {
        const veiculosDisponiveis = [
            { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2023, cor: 'Branco', preco: 120000, vendido: false },
        ];
        veiculosModel.listarVeiculosDisponiveis.mockReturnValue(veiculosDisponiveis);

        const response = await request(app).get('/veiculos/available');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(veiculosDisponiveis);
    });

    // Testes para GET /sold
    test('GET /veiculos/sold deve retornar a lista de veículos vendidos', async () => {
        const veiculosVendidos = [
            { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2022, cor: 'Preto', preco: 110000, vendido: true },
        ];
        veiculosModel.listarVeiculosVendidos.mockReturnValue(veiculosVendidos);

        const response = await request(app).get('/veiculos/sold');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(veiculosVendidos);
    });

    // Testes para POST /create
    test('POST /veiculos/create deve retornar erro se os dados forem inválidos', async () => {
        const veiculoInvalido = { marca: 'Toyota', modelo: 'Corolla' }; // Faltando campos obrigatórios
        const response = await request(app).post('/veiculos/create').send(veiculoInvalido);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ erro: 'Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.' });
    });

    test('POST /veiculos/create deve cadastrar um veículo se os dados forem válidos', async () => {
        const novoVeiculo = {
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2023,
            cor: 'Branco',
            preco: 120000,
        };
        veiculosModel.adicionarVeiculo.mockReturnValue({ id: 1, ...novoVeiculo });

        const response = await request(app).post('/veiculos/create').send(novoVeiculo);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            mensagem: 'Veículo cadastrado com sucesso!',
            veiculo: { id: 1, ...novoVeiculo },
        });
    });

    // Testes para PUT /update/:id
    test('PUT /veiculos/update/:id deve retornar erro se o veículo não existir', async () => {
        veiculosModel.listarVeiculos.mockReturnValue([]);
        const response = await request(app).put('/veiculos/update/99').send({ modelo: 'Novo Modelo' });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ erro: 'Veículo não encontrado.' });
    });

    test('PUT /veiculos/update/:id deve atualizar um veículo se ele existir', async () => {
        const veiculoExistente = {
            id: 1,
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2020,
            cor: 'Prata',
            preco: 75000,
            vendido: false,
        };
        veiculosModel.listarVeiculos.mockReturnValue([veiculoExistente]);
        veiculosModel.editarVeiculo.mockReturnValue({ ...veiculoExistente, modelo: 'Novo Modelo' });

        const response = await request(app).put('/veiculos/update/1').send({ modelo: 'Novo Modelo' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            mensagem: 'Veículo atualizado com sucesso!',
            veiculo: { ...veiculoExistente, modelo: 'Novo Modelo' },
        });
    });
});