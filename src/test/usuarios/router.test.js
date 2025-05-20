const request = require('supertest');
const express = require('express');
const router = require('../../routers/usuarios/router');
const model = require('../../models/usuarios/model'); // Importação do model

jest.mock('../../models/usuarios/model'); // Mock do model para isolar os testes

const app = express();
app.use(express.json());
app.use('/usuarios', router);

describe('Testes para as rotas de usuários', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    test('GET /usuarios/viewer deve listar usuários', async () => {
        const mockUsuarios = [
            { id: 1, nome: 'João Silva', email: 'joao.silva@email.com' },
            { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@email.com' }
        ];
        model.listarUsuarios.mockReturnValue(mockUsuarios);

        const response = await request(app).get('/usuarios/viewer');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsuarios);
    });

    test('POST /usuarios/create deve cadastrar um usuário', async () => {
        const novoUsuario = { nome: 'João', email: 'joao@example.com' };
        const mockUsuarioCriado = { id: 1, ...novoUsuario };

        model.listarUsuarios.mockReturnValue([]);
        model.cadastrarUsuario.mockReturnValue(mockUsuarioCriado);

        const response = await request(app).post('/usuarios/create').send(novoUsuario);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: mockUsuarioCriado
        });
    });

    test('POST /usuarios/create deve retornar erro ao tentar cadastrar usuário existente', async () => {
        const usuarioExistente = { id: 1, nome: 'João', email: 'joao@example.com' };

        model.listarUsuarios.mockReturnValue([usuarioExistente]); // Mock do retorno do model

        const response = await request(app).post('/usuarios/create').send(usuarioExistente);
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ erro: 'Usuário com este email já está cadastrado.' });
    });
});