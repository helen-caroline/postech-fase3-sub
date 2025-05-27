const model = require('../../models/keycloack/model');

async function loginClientCredentials(req, res) {
    try {
        const { access_token } = await model.getClientCredentialsToken(); // Agora a função está corretamente importada
        req.session.access_token = access_token; // Armazena o token na sessão
        res.status(200).json({ access_token });
    } catch (error) {
        console.error('Erro ao obter o token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao obter o token de acesso' });
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
    }
}

module.exports = { 
    loginClientCredentials, 
    loginWithPassword 
};