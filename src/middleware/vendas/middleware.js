const validarDadosVenda = (req, res, next) => {
    const { veiculoId, usuarioId } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!veiculoId || !usuarioId) {
        return res.status(400).json({ erro: 'ID do veículo e ID do usuário são obrigatórios.' });
    }

    // Verificar se o ID do veículo é um número válido
    if (typeof veiculoId !== 'number' || veiculoId <= 0) {
        return res.status(400).json({ erro: 'ID do veículo deve ser um número válido e maior que zero.' });
    }

    // Verificar se o ID do usuário é um número válido
    if (typeof usuarioId !== 'number' || usuarioId <= 0) {
        return res.status(400).json({ erro: 'ID do usuário deve ser um número válido e maior que zero.' });
    }

    next(); // Continua para o próximo middleware ou controlador
};

module.exports = {
    validarDadosVenda,
};