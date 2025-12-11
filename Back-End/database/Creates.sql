CREATE TABLE tb_organizador (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_fantasia VARCHAR(100) NOT NULL,
    razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE tb_participante (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tb_uf (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sigla VARCHAR(2) NOT NULL
);

CREATE TABLE tb_categoria (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE tb_status_evento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE tb_tipo_ingresso (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE tb_forma_pagamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE tb_evento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    capa_url VARCHAR(200) NOT NULL,
    data DATE NOT NULL,
    id_organizador INT NOT NULL,
    id_status_evento INT NOT NULL,
    CONSTRAINT fk_evento_organizador
        FOREIGN KEY (id_organizador) REFERENCES tb_organizador(id) ON DELETE CASCADE,
    CONSTRAINT fk_evento_status
        FOREIGN KEY (id_status_evento) REFERENCES tb_status_evento(id) ON DELETE CASCADE
);

CREATE TABLE tb_setor (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    id_evento INT NOT NULL,
    capacidade_atual INT NOT NULL,
    CONSTRAINT fk_setor_evento
        FOREIGN KEY (id_evento) REFERENCES tb_evento(id) ON DELETE CASCADE
);

CREATE TABLE tb_lote_ingresso (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    quantidade INT NOT NULL,
    valor DECIMAL(11,2) NOT NULL,
    data_inicio_venda DATE NOT NULL,
    disponibilidade BOOLEAN DEFAULT FALSE,
    id_setor INT NOT NULL,
    id_tipo INT NOT NULL,
    CONSTRAINT fk_lote_setor
        FOREIGN KEY (id_setor) REFERENCES tb_setor(id) ON DELETE CASCADE,
    CONSTRAINT fk_lote_tipo
        FOREIGN KEY (id_tipo) REFERENCES tb_tipo_ingresso(id) ON DELETE CASCADE
);

CREATE TABLE tb_pedido (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_pagamento DATE NOT NULL,
    total DECIMAL(11,2) NOT NULL,
    id_participante INT NOT NULL,
    id_forma_pagamento INT NOT NULL,
    CONSTRAINT fk_pedido_participante
        FOREIGN KEY (id_participante) REFERENCES tb_participante(id) ON DELETE CASCADE,
    CONSTRAINT fk_pedido_forma_pagamento
        FOREIGN KEY (id_forma_pagamento) REFERENCES tb_forma_pagamento(id) ON DELETE CASCADE
);

CREATE TABLE tb_ingressos_pedido (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_lote_ingresso INT NOT NULL,
    id_pedido INT NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT fk_ingressos_pedido_lote
        FOREIGN KEY (id_lote_ingresso) REFERENCES tb_lote_ingresso(id) ON DELETE CASCADE,
    CONSTRAINT fk_ingressos_pedido_pedido
        FOREIGN KEY (id_pedido) REFERENCES tb_pedido(id) ON DELETE CASCADE
);

CREATE TABLE tb_categoria_evento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    evento_id INT NOT NULL,
    CONSTRAINT fk_categoria_evento_categoria
        FOREIGN KEY (categoria_id) REFERENCES tb_categoria(id) ON DELETE CASCADE,
    CONSTRAINT fk_categoria_evento_evento
        FOREIGN KEY (evento_id) REFERENCES tb_evento(id) ON DELETE CASCADE
);

CREATE TABLE tb_endereco_evento (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    id_uf INT NOT NULL,
    id_evento INT NOT NULL,
    CONSTRAINT fk_endereco_evento_uf
        FOREIGN KEY (id_uf) REFERENCES tb_uf(id) ON DELETE CASCADE,
    CONSTRAINT fk_endereco_evento_evento
        FOREIGN KEY (id_evento) REFERENCES tb_evento(id) ON DELETE CASCADE
);

CREATE TABLE tb_endereco_participante (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    id_uf INT NOT NULL,
    id_participante INT NOT NULL,
    CONSTRAINT fk_endereco_uf 
        FOREIGN KEY (id_uf) REFERENCES tb_uf(id) ON DELETE CASCADE,
    CONSTRAINT fk_endereco_participante 
        FOREIGN KEY (id_participante) REFERENCES tb_participante(id) ON DELETE CASCADE
);

CREATE TABLE tb_endereco_organizador (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    id_uf INT NOT NULL,
    id_organizador INT NOT NULL,
    CONSTRAINT fk_endereco_organizador_uf
        FOREIGN KEY (id_uf) REFERENCES tb_uf(id) ON DELETE CASCADE,
    CONSTRAINT fk_endereco_organizador
        FOREIGN KEY (id_organizador) REFERENCES tb_organizador(id) ON DELETE CASCADE
);
