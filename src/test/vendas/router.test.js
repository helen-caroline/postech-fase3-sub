const request = require('supertest');
const app = require('../../app'); // Certifique-se de que o caminho está correto
const usuariosModel = require('../../models/usuarios/model');
const veiculosModel = require('../../models/veiculos/model');

jest.mock('../../models/usuarios/model');
jest.mock('../../models/veiculos/model');

describe('POST /vendas/buy', () => {
    test('Deve falhar ao tentar comprar um veículo com um usuário não cadastrado', async () => {
        const veiculoId = 1;
        const username = 'usuario_inexistente';

        // Mock para simular que o usuário não existe no Keycloak
        usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
        usuariosModel.getUserByUsername.mockResolvedValue([]); // Nenhum usuário encontrado

        // Mock para simular que o veículo está disponível
        veiculosModel.listarVeiculos.mockResolvedValue([
            { id: veiculoId, vendido: false },
        ]);

        const response = await request(app)
            .post('/vendas/buy')
            .send({ username, veiculoId });

        expect(response.status).toBe(404); // Deve retornar 404 (Usuário não encontrado)
        expect(response.body).toEqual({ erro: 'Usuário não encontrado no Keycloak.' });
    });
});