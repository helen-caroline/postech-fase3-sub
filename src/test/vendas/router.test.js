const request = require('supertest');
const express = require('express');
const vendasRouter = require('../../routers/vendas/router');
const vendasModel = require('../../models/vendas/model');
const veiculosModel = require('../../models/veiculos/model');

jest.mock('../../models/vendas/model', () => ({
    registrarVenda: jest.fn(),
    listarVendas: jest.fn()
}));

jest.mock('../../models/veiculos/model', () => ({
    listarVeiculos: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/vendas', vendasRouter);

describe('Testes para as rotas de vendas', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    test('GET /vendas/viewer deve listar vendas', async () => {
        const mockVendas = [
            { id: 1, veiculoId: 1, comprador: 'João', data: '2023-01-01T00:00:00.000Z' }
        ];
        vendasModel.listarVendas.mockReturnValue(mockVendas);

        const response = await request(app).get('/vendas/viewer');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockVendas);
    });

    test('POST /vendas/create deve registrar uma venda', async () => {
        const mockVeiculo = { id: 1, vendido: false };
        const novaVenda = { veiculoId: 1, comprador: 'João' };
        const mockVendaCriada = { id: 1, ...novaVenda, data: '2023-01-01T00:00:00.000Z' };

        veiculosModel.listarVeiculos.mockReturnValue([mockVeiculo]);
        vendasModel.registrarVenda.mockReturnValue(mockVendaCriada);

        const response = await request(app).post('/vendas/create').send(novaVenda);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            mensagem: 'Venda registrada com sucesso!',
            venda: mockVendaCriada
        });
    });

    test('POST /vendas/create deve retornar erro ao tentar vender veículo inexistente ou já vendido', async () => {
        const novaVenda = { veiculoId: 99, comprador: 'João' };

        vendasModel.registrarVenda.mockReturnValue(null);

        const response = await request(app).post('/vendas/create').send(novaVenda);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ erro: 'Veículo não encontrado ou já vendido.' });
    });
});