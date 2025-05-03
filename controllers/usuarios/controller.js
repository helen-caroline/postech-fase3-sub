const usuarios_model = require('../../models/usuarios/model');

// GET
const listarUsuarios = (req, res) => {
    const usuarios = usuarios_model.listarUsuarios();
    res.status(200).json(usuarios);
};

// POST
const cadastrarUsuario = (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    const usuario = usuarios_model.cadastrarUsuario({ nome, email });
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario });
};

// PUT



module.exports = {
    listarUsuarios,
    cadastrarUsuario,
};