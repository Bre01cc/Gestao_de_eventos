
-- tb_organizador
INSERT INTO tb_organizador (nome_fantasia, razao_social, cnpj, email, telefone, senha) VALUES
('Organizador A', 'Organizador A LTDA', '12345678000100', 'contatoA@org.com', '11999999999', 'senhaA'),
('Organizador B', 'Organizador B LTDA', '98765432000100', 'contatoB@org.com', '11988888888', 'senhaB');

-- INSSERT DE ESTADOS(UF) --
INSERT INTO tb_uf (sigla) VALUES
('AC'), ('AL'), ('AP'), ('AM'), ('BA'), ('CE'),
('DF'), ('ES'), ('GO'), ('MA'), ('MT'), ('MS'),
('MG'), ('PA'), ('PB'),('PR'), ('PE'), ('PI'), 
('RJ'), ('RN'), ('RS'), ('RO'), ('RR'), ('SC'),
('SP'), ('SE'), ('TO');

-- INSERT DE CATEGORIAS --
INSERT INTO tb_categoria (nome) VALUES
('Música'), ('Tecnologia'), ('Games'), ('Cosplay'),
('Teatro'), ('Esportes'), ('Palestra'), ('Festival'),
('Feira'), ('Cultura'), ('Bem-estar');

INSERT INTO tb_status_evento (nome)
VALUES 
('Ativo'),
('Cancelado'),
('Encerrado'),
('Esgotado');


-- tb_participante
INSERT INTO tb_participante (nome, cpf, data_nascimento, telefone, email, senha) VALUES
('João Silva', '11122233344', '1990-01-15', '11977777777', 'joao@email.com', 'senha1'),
('Maria Souza', '55566677788', '1985-07-22', '11966666666', 'maria@email.com', 'senha2');


-- tb_forma_pagamento
INSERT INTO tb_forma_pagamento (nome) VALUES
('Cartão de Crédito'),
('Pix'),
('Débito');


-- tb_evento
INSERT INTO tb_evento (nome, descricao, capa_url, data, id_organizador, id_status_evento) VALUES
('Festival de Música', 'Evento de música ao vivo', 'http://urlcapa.com/festival.jpg', '2026-01-15', 1, 1),
('Conferência Tech', 'Evento de tecnologia', 'http://urlcapa.com/conferencia.jpg', '2026-03-10', 2, 2);


-- 12) SETORES
INSERT INTO tb_setor (nome, capacidade, id_evento, capacidade_atual) VALUES
('Pista', 2000, 1, 2000),
('VIP', 200, 1, 200),
('Backstage', 100, 1, 100),
('Estande Geral', 1500, 2, 1500),
('Área VIP', 150, 2, 150);



-- 4) TIPOS DE INGRESSO
INSERT INTO tb_tipo_ingresso (tipo) VALUES
('Ingresso Geral'),
('Ingresso VIP'),
('Experiência Premium');


-- tb_lote_ingresso
INSERT INTO tb_lote_ingresso (numero, quantidade, valor, data_inicio_venda, disponibilidade, id_setor, id_tipo) VALUES
(1, 100, 150.00, '2025-12-15', TRUE, 1, 1),
(2, 200, 80.00, '2025-12-20', TRUE, 2, 2);

-- tb_pedido
INSERT INTO tb_pedido (data_pagamento, total, id_participante, id_forma_pagamento) VALUES
('2025-12-01', 150.00, 1, 1),
('2025-12-02', 160.00, 2, 2);


-- tb_ingressos_pedido
INSERT INTO tb_ingressos_pedido (id_lote_ingresso, id_pedido, quantidade) VALUES
(3, 1, 1),
(4, 2, 2);


-- tb_categoria_evento
INSERT INTO tb_categoria_evento (categoria_id, evento_id) VALUES
(4, 1),
(1, 2);

-- tb_endereco_evento
INSERT INTO tb_endereco_evento (cep, logradouro, cidade, bairro, numero, id_uf, id_evento) VALUES
('01001000', 'Rua A', 'São Paulo', 'Centro', '100', 1, 1),
('20020020', 'Rua B', 'Rio de Janeiro', 'Botafogo', '200', 2, 2);

-- tb_endereco_participante
INSERT INTO tb_endereco_participante (cep, cidade, bairro, numero, logradouro, id_uf, id_participante) VALUES
('01111000', 'São Paulo', 'Jardins', '101', 'Av. Paulista', 1, 1),
('22222000', 'Rio de Janeiro', 'Copacabana', '202', 'Rua Atlântica', 2, 2);

-- tb_endereco_organizador
INSERT INTO tb_endereco_organizador (cep, cidade, bairro, numero, logradouro, id_uf, id_organizador) VALUES
('01313000', 'São Paulo', 'Moema', '303', 'Rua das Flores', 1, 1),
('22333000', 'Rio de Janeiro', 'Barra', '404', 'Av. das Américas', 2, 2);



