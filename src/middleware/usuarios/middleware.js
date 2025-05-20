const model = require('../../models/usuarios/model');

const validarDadosUsuario = (req, res, next) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    next(); // Continua para o próximo middleware ou controlador
};

const verificarUsuarioExistente = (req, res, next) => {
    const { email } = req.body;

    const usuarioExistente = model.listarUsuarios().find(usuario => usuario.email === email);

    if (usuarioExistente) {
        return res.status(409).json({ erro: 'Usuário com este email já está cadastrado.' });
    }

    next(); // Continua para o próximo middleware ou controlador
};

module.exports = {
    validarDadosUsuario,
    verificarUsuarioExistente,
}