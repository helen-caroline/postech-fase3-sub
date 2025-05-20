const validarDadosVenda = (req, res, next) => {
    const { veiculoId, comprador } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!veiculoId || !comprador) {
        return res.status(400).json({ erro: 'ID do veículo e comprador são obrigatórios.' });
    }

    // Verificar se o ID do veículo é um número válido
    if (typeof veiculoId !== 'number' || veiculoId <= 0) {
        return res.status(400).json({ erro: 'ID do veículo deve ser um número válido e maior que zero.' });
    }

    // Verificar se o nome do comprador é uma string válida
    if (typeof comprador !== 'string' || comprador.trim() === '') {
        return res.status(400).json({ erro: 'O nome do comprador deve ser uma string válida.' });
    }

    next(); // Continua para o próximo middleware ou controlador
};

module.exports = {
    validarDadosVenda,
};