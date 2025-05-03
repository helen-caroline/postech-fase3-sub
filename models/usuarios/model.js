// Simulação de banco de dados para usuários
let usuarios = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao.silva@email.com"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria.oliveira@email.com"
    },
    {
        id: 3,
        nome: "Carlos Santos",
        email: "carlos.santos@email.com"
    }
];

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

// Função para verificar se um usuário está cadastrado
const verificarUsuario = (id) => {
    return usuarios.find(usuario => usuario.id === id);
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    verificarUsuario
};