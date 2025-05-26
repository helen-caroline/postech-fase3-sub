const { getAccessToken, createUser } = require('../../models/usuarios/model');

const createUserController = async (req, res) => {
    try {
        // Obter o token de acesso
        const accessToken = await getAccessToken();
        console.log("Token obtido:", accessToken);

        // Dados do usuário a serem criados (vindo do corpo da requisição)
        const userData = req.body;

        // Criar o usuário no Keycloak
        const createdUser = await createUser(accessToken, userData);
        console.log("Usuário criado com sucesso:", createdUser);

        // Enviar uma resposta ao cliente
        res.status(201).json({ message: 'Usuário criado com sucesso'});
    } catch (error) {
        console.error('Erro ao criar o usuário:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao criar o usuário', details: error.response?.data || error.message });
    }
};

module.exports = { createUserController };