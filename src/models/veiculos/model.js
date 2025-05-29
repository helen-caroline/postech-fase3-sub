const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// GET
const listarVeiculos = async () => {
    const [rows] = await pool.query('SELECT * FROM tb_veiculos');
    return rows;
};

const listarVeiculosDisponiveis = async () => {
    const [rows] = await pool.query('SELECT * FROM tb_veiculos WHERE vendido = false ORDER BY preco ASC');
    return rows;
};

const listarVeiculosVendidos = async () => {
    const [rows] = await pool.query('SELECT * FROM tb_veiculos WHERE vendido = true ORDER BY preco ASC');
    return rows;
};

// POST
const adicionarVeiculo = async (veiculo) => {
    const { marca, modelo, ano, cor, preco } = veiculo;
    const [result] = await pool.query(
        'INSERT INTO tb_veiculos (marca, modelo, ano, cor, preco, vendido) VALUES (?, ?, ?, ?, ?, ?)',
        [marca, modelo, ano, cor, preco, false]
    );
    return { id: result.insertId, ...veiculo, vendido: false };
};

// PUT
const editarVeiculo = async (id, dadosAtualizados) => {
    const [result] = await pool.query('UPDATE tb_veiculos SET ? WHERE id = ?', [dadosAtualizados, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    const [updatedVeiculo] = await pool.query('SELECT * FROM tb_veiculos WHERE id = ?', [id]);
    return updatedVeiculo[0];
};

module.exports = {
    listarVeiculos,
    adicionarVeiculo,
    editarVeiculo,
    listarVeiculosDisponiveis,
    listarVeiculosVendidos,
};