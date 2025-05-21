const request = require('supertest');
const express = require('express');
const vendasRouter = require('../../routers/vendas/router');
const vendasModel = require('../../models/vendas/model');
const veiculosModel = require('../../models/veiculos/model');

jest.mock('../../models/vendas/model', () => ({
    registrarVenda: jest.fn(),
    listarVendas: jest.fn(),
}));

jest.mock('../../models/veiculos/model', () => ({
    listarVeiculos: jest.fn(),
    editarVeiculo: jest.fn(),
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

    test('POST /vendas/buy deve registrar uma venda e marcar o veículo como vendido', async () => {
        const veiculoDisponivel = {
            id: 1,
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2020,
            cor: 'Prata',
            preco: 75000,
            vendido: false
        };
    
        veiculosModel.listarVeiculos.mockReturnValue([veiculoDisponivel]);
        veiculosModel.editarVeiculo.mockReturnValue({ ...veiculoDisponivel, vendido: true });
        vendasModel.registrarVenda.mockReturnValue({
            id: 1,
            veiculoId: veiculoDisponivel.id,
            usuarioId: 123,
            data: new Date()
        });
    
        const response = await request(app).post('/vendas/buy').send({
            veiculoId: veiculoDisponivel.id,
            usuarioId: 123
        });
    
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            mensagem: 'Venda registrada com sucesso!',
            venda: {
                id: 1,
                veiculoId: veiculoDisponivel.id,
                usuarioId: 123,
                data: expect.any(String)
            },
            veiculo: { ...veiculoDisponivel, vendido: true }
        });
    });
});