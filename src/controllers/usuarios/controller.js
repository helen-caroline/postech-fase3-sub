const model = require('../../models/usuarios/model');

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
        await model.DeleteUser(accessToken, userId);
        console.log("Usuário deletado com sucesso:", userId);

        // Enviar uma resposta ao cliente
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao deletar o usuário', details: error.response?.data || error.message });
    }
};

module.exports = { 
    createUserController,
    deleteUserController
};