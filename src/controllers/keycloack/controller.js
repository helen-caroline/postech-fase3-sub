const model = require('../../models/keycloack/model');

async function loginClientCredentials(req, res) {
    try {
        const { access_token } = await model.getClientCredentialsToken(); // Agora a função está corretamente importada
        req.session.access_token = access_token; // Armazena o token na sessão
        res.status(200).json({ access_token });
    } catch (error) {
        console.error('Erro ao obter o token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao obter o token de acesso' });
        console.error('Erro na requisição:', error.response?.data || error.message);
        console.error('Detalhes do erro:', error);
        throw error;
    }
}

async function loginWithPassword(req, res) {
    try {
        const { username } = req.params;
        const { password } = req.body;

        const { access_token, refresh_token } = await model.getPasswordGrantToken(username, password); // Agora a função está corretamente importada
        req.session.access_token = access_token; // Armazena o token na sessão
        req.session.refresh_token = refresh_token;

        res.status(200).json({ access_token, refresh_token });
    } catch (error) {
        console.error('Erro ao obter os tokens:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao obter os tokens de acesso' });
        console.error('Erro na requisição:', error.response?.data || error.message);
        console.error('Detalhes do erro:', error);
        throw error;
    }
}

async function introspectToken(req, res) {
    try {
        const { username } = req.params;

        // Recuperar o token do cabeçalho Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'Token de autorização não fornecido ou inválido' });
        }

        const access_token = authHeader.split(' ')[1]; // Extrai o token após "Bearer"

        // Realizar a introspecção do token
        const introspectionResult = await model.introspectToken(access_token);

        res.status(200).json({ username, introspection: introspectionResult });
    } catch (error) {
        console.error('Erro ao introspectar o token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao introspectar o token' });
    }
}

async function logoutUser(req, res) {
    try {
        const { username } = req.params;

        // Recuperar o token do cabeçalho Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'Token de autorização não fornecido ou inválido' });
        }

        const refresh_token = authHeader.split(' ')[1]; // Extrai o token após "Bearer"

        // Realizar a introspecção do token
        const introspectionResult = await model.introspectToken(refresh_token);

        if (!introspectionResult.active) {
            return res.status(400).json({ error: 'Usuário não está conectado' });
        }

        // Realizar o logout do usuário
        const logoutResult = await model.logoutUser(refresh_token);

        res.status(200).json({ username, message: 'Logout realizado com sucesso', result: logoutResult });

    } catch (error) {
        console.error('Erro ao fazer logout:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao fazer logout' });
    }
}

module.exports = { 
    loginClientCredentials, 
    loginWithPassword,
    introspectToken,
    logoutUser
};