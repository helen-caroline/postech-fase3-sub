// Simulação de banco de dados para usuários
let usuarios = [];

// Função para cadastrar um usuário
const cadastrarUsuario = (usuario) => {
    const novoUsuario = {
        id: usuarios.length + 1,
        ...usuario
    };
    usuarios.push(novoUsuario);
    return novoUsuario;
};

// Função para listar usuários
const listarUsuarios = () => {
    return usuarios;
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
};