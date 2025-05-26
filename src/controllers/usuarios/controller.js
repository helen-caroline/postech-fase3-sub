const model = require('../../models/usuarios/model');

const getAllUsersController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await model.getAccessToken();

        // Buscar todos os usuários no Keycloak
        const users = await model.getAllUsers(accessToken);

        // Enviar a resposta ao cliente
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao buscar todos os usuários', details: error.response?.data || error.message });
    }
};

const getUserBYController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await model.getAccessToken();

        // Obter o username da rota (parâmetro de URL)
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'O username é obrigatório.' });
        }

        // Buscar o usuário no Keycloak
        const users = await model.getUserByUsername(accessToken, username);

        // Enviar a resposta ao cliente
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao buscar o usuário', details: error.response?.data || error.message });
    }
};

const createUserController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await model.getAccessToken();
        console.log("Token obtido:", accessToken);

        // Dados do usuário a serem criados (vindo do corpo da requisição)
        const userData = req.body;

        // Criar o usuário no Keycloak
        const createdUser = await model.createUser(accessToken, userData);
        console.log("Usuário criado com sucesso:", createdUser);

        // Enviar uma resposta ao cliente
        res.status(201).json({ message: 'Usuário criado com sucesso'});
    } catch (error) {
        console.error('Erro ao criar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao criar o usuário', details: error.response?.data || error.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await model.getAccessToken();
        console.log("Token obtido:", accessToken);

        // Obter o ID do usuário a ser deletado do corpo da requisição
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
        }

        // Deletar o usuário no Keycloak
        await model.deleteUser(accessToken, userId);
        console.log("Usuário deletado com sucesso:", userId);

        // Enviar uma resposta ao cliente
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao deletar o usuário', details: error.response?.data || error.message });
    }
};

const updateUserController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await model.getAccessToken();
        console.log("Token obtido:", accessToken);

        // Obter o ID do usuário e os dados a serem atualizados do corpo da requisição
        const { userId, username, ...updateData } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'O ID do usuário é obrigatório.' });
        }

        // Verificar se o campo username está presente
        if (username) {
            return res.status(400).json({
                error: 'O campo "username" não pode ser alterado.',
                message: 'Se precisar alterar o username, delete o usuário e crie-o novamente.',
            });
        }

        // Atualizar o usuário no Keycloak
        await model.updateUser(accessToken, userId, updateData);
        console.log("Usuário atualizado com sucesso:", userId);

        // Enviar uma resposta ao cliente
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao atualizar o usuário', details: error.response?.data || error.message });
    }
};

module.exports = {
    getAllUsersController,
    getUserBYController,
    createUserController,
    deleteUserController,
    updateUserController
};