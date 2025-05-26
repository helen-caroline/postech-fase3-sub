const request = require('supertest');
const app = require('../../app'); // Certifique-se de importar o app corretamente
const usuariosModel = require('../../models/usuarios/model');

jest.mock('../../models/usuarios/model');

describe('Testes para as rotas de usuários', () => {
    describe('GET /usuarios/get', () => {
        test('Deve retornar todos os usuários', async () => {
            const mockUsers = [
                { id: '1', username: 'user1' },
                { id: '2', username: 'user2' },
            ];

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.getAllUsers.mockResolvedValue(mockUsers);

            const response = await request(app).get('/usuarios/get');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });

        test('Deve retornar erro ao falhar na busca de usuários', async () => {
            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.getAllUsers.mockRejectedValue(new Error('Erro ao buscar usuários'));

            const response = await request(app).get('/usuarios/get');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao buscar todos os usuários');
        });
    });

    describe('GET /usuarios/get/:username', () => {
        test('Deve retornar um usuário pelo username', async () => {
            const mockUser = [{ id: '1', username: 'user1' }];

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.getUserByUsername.mockResolvedValue(mockUser);

            const response = await request(app).get('/usuarios/get/user1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        test('Deve retornar erro ao não encontrar o usuário', async () => {
            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.getUserByUsername.mockResolvedValue([]);

            const response = await request(app).get('/usuarios/get/user_inexistente');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('POST /usuarios/create', () => {
        test('Deve criar um novo usuário', async () => {
            const newUser = { username: 'new_user', email: 'new_user@example.com' };

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.createUser.mockResolvedValue({});

            const response = await request(app).post('/usuarios/create').send(newUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso');
        });

        test('Deve retornar erro ao falhar na criação do usuário', async () => {
            const newUser = { username: 'new_user', email: 'new_user@example.com' };

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.createUser.mockRejectedValue(new Error('Erro ao criar usuário'));

            const response = await request(app).post('/usuarios/create').send(newUser);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao criar o usuário');
        });
    });

    describe('DELETE /usuarios/delete', () => {
        test('Deve deletar um usuário', async () => {
            const userId = '1';

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.deleteUser.mockResolvedValue({});

            const response = await request(app).delete('/usuarios/delete').send({ userId });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Usuário deletado com sucesso');
        });

        test('Deve retornar erro ao falhar na deleção do usuário', async () => {
            const userId = '1';

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.deleteUser.mockRejectedValue(new Error('Erro ao deletar usuário'));

            const response = await request(app).delete('/usuarios/delete').send({ userId });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao deletar o usuário');
        });
    });

    describe('PUT /usuarios/update', () => {
        test('Deve atualizar um usuário', async () => {
            const updateData = { userId: '1', email: 'updated_user@example.com' };

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.updateUser.mockResolvedValue({});

            const response = await request(app).put('/usuarios/update').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Usuário atualizado com sucesso');
        });

        test('Deve retornar erro ao tentar atualizar o username', async () => {
            const updateData = { userId: '1', username: 'new_username' };

            const response = await request(app).put('/usuarios/update').send(updateData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'O campo "username" não pode ser alterado.');
        });

        test('Deve retornar erro ao falhar na atualização do usuário', async () => {
            const updateData = { userId: '1', email: 'updated_user@example.com' };

            usuariosModel.getAccessToken.mockResolvedValue('mocked_access_token');
            usuariosModel.updateUser.mockRejectedValue(new Error('Erro ao atualizar usuário'));

            const response = await request(app).put('/usuarios/update').send(updateData);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao atualizar o usuário');
        });
    });
});