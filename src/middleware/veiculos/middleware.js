const model = require('../../models/veiculos/model');

// Middleware para validar os dados do veículo
const validarDadosVeiculo = (req, res, next) => {
    const { marca, modelo, ano, cor, preco } = req.body;

    // Permitir atualizações parciais no caso de PUT
    if (req.method === 'PUT') {
        if (!marca && !modelo && !ano && !cor && !preco) {
            return res.status(400).json({ erro: 'Pelo menos um campo deve ser fornecido para atualização.' });
        }
        return next();
    }

    // Validação completa para POST
    if (!marca || !modelo || !ano || !cor || !preco) {
        return res.status(400).json({ erro: 'Todos os campos (marca, modelo, ano, cor, preco) são obrigatórios.' });
    }

    // Verificar se o ano é um número válido
    if (ano && (typeof ano !== 'number' || ano <= 0)) {
        return res.status(400).json({ erro: 'O ano deve ser um número válido e maior que zero.' });
    }

    // Verificar se o preço é um número válido
    if (preco && (typeof preco !== 'number' || preco <= 0)) {
        return res.status(400).json({ erro: 'O preço deve ser um número válido e maior que zero.' });
    }

    next(); // Continua para o próximo middleware ou controlador
};

// Middleware para verificar se o veículo existe
const verificarVeiculoExistente = (req, res, next) => {
    const { id } = req.params;

    // Verificar se o ID é válido
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ erro: 'ID do veículo inválido.' });
    }

    const veiculo = model.listarVeiculos().find(v => v.id === parseInt(id));
    if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    req.veiculo = veiculo; // Adiciona o veículo encontrado ao objeto da requisição
    next(); // Continua para o próximo middleware ou controlador
};

module.exports = {
    validarDadosVeiculo,
    verificarVeiculoExistente
};