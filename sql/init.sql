-- // bloco: 1
USE veiculos;

-- // bloco: 2
CREATE TABLE tb_veiculos (
    id INT PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INT,
    cor VARCHAR(20),
    preco DECIMAL(10, 2),
    vendido BOOLEAN
);

-- // bloco: 3
CREATE TABLE tb_vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT NOT NULL,
    usuario_id VARCHAR(255) NOT NULL,
    data DATETIME NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES tb_veiculos(id)
);

-- // bloco: 4
INSERT INTO tb_veiculos (id, marca, modelo, ano, cor, preco, vendido) VALUES
(1, 'Toyota', 'Corolla', 2020, 'Prata', 75000, false),
(2, 'Honda', 'Civic', 2019, 'Preto', 85000, false),
(3, 'Fiat', 'Uno', 2015, 'Branco', 25000, true),
(4, 'Ford', 'Ka', 2018, 'Vermelho', 30000, false);