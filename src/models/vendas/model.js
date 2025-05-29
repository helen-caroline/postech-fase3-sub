const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Registrar uma venda
const registrarVenda = async (vendaData) => {
    const { veiculoId, usuarioId, data } = vendaData;

    const [result] = await pool.query(
        'INSERT INTO tb_vendas (veiculo_id, usuario_id, data) VALUES (?, ?, ?)',
        [veiculoId, usuarioId, data]
    );

    return {
        id: result.insertId,
        veiculoId,
        usuarioId,
        data,
    };
};

// Listar todas as vendas
const listarVendas = async () => {
    const [rows] = await pool.query(
        'SELECT v.id, v.data, v.veiculo_id, v.usuario_id, ve.marca, ve.modelo, ve.ano, ve.cor, ve.preco FROM tb_vendas v JOIN tb_veiculos ve ON v.veiculo_id = ve.id'
    );
    return rows;
};

module.exports = {
    registrarVenda,
    listarVendas,
};