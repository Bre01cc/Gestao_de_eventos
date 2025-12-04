-- ---------------------------------------------------------------------------------------------------------------------------
-- 1) UF
INSERT INTO tb_uf (sigla) VALUES
('AC'), ('AL'), ('AP'), ('AM'), ('BA'), ('CE'),
('DF'), ('ES'), ('GO'), ('MA'), ('MT'), ('MS'),
('MG'), ('PA'), ('PB'), ('PR'), ('PE'), ('PI'),
('RJ'), ('RN'), ('RS'), ('RO'), ('RR'), ('SC'),
('SP'), ('SE'), ('TO');

-- 2) PARTICIPANTES 
INSERT INTO tb_participante (nome, cpf, data_nascimento, telefone, email, senha, status) VALUES
('Weslei Santos', '12345678901', '2001-10-18', '(11)90000-0001', 'weslei.santos@email.com', 'senhaWeslei123', TRUE),
('Enzo Carrilho', '98765432100', '2005-09-25', '(11)90000-0002', 'enzo.carrilho@email.com', 'senhaCarrilho123', TRUE),
('Breno Assis', '65498732155', '2008-12-10', '(11)90000-0003', 'breno.assis@email.com', 'senhaBreno123', TRUE),
('Ricardo Almeida', '11223344556', '1992-06-15', '(11)90000-0004', 'ricardo.almeida@email.com', 'senhaRicardo123', TRUE),
('Fernanda Costa', '33221144556', '1999-03-21', '(11)90000-0005', 'fernanda.costa@email.com', 'senhaFernanda123', TRUE);

-- 3) ORGANIZADORES
INSERT INTO tb_organizador (nome_fantasia, razao_social, cnpj, email, telefone, senha) VALUES
('Music Live', 'Music Live Produções LTDA', '10293847000188', 'contato@musiclive.com', '11999887766', 'music123'),
('Cosplay World', 'Cosplay World Eventos ME', '20394857000155', 'suporte@cosplayworld.com', '11988776655', 'cosplay123'),
('Game On Expo', 'Game On Feiras e Eventos LTDA', '30495876000144', 'contato@gameonexpo.com', '11977665544', 'game123'),
('Tech Future', 'Tech Future Eventos e Inovação SA', '40596835000122', 'eventos@techfuture.com', '11966554433', 'tech123');

-- 4) TIPOS DE INGRESSO
INSERT INTO tb_tipo_ingresso (tipo) VALUES
('Ingresso Geral'),
('Ingresso VIP'),
('Experiência Premium');

-- 5) CATEGORIAS
INSERT INTO tb_categoria (nome) VALUES
('Música'), ('Tecnologia'), ('Games'), ('Cosplay'),
('Teatro'), ('Esportes'), ('Palestra'), ('Festival'),
('Feira'), ('Cultura'), ('Bem-estar');

-- 6) STATUS DE EVENTO
INSERT INTO tb_status_evento (nome) VALUES
('Ativo'),
('Cancelado'),
('Encerrado'),
('Esgotado');

-- 7) FORMA DE PAGAMENTO
INSERT INTO tb_forma_pagamento (nome) VALUES
('Cartão de Crédito'),
('Cartão de Débito'),
('Boleto Bancário'),
('Pix'),
('PayPal'),
('Transferência');

-- 8) ENDEREÇOS DOS ORGANIZADORES 
INSERT INTO tb_endereco_organizador (cep, cidade, bairro, numero, logradouro, id_uf, id_organizador) VALUES
('01001000', 'São Paulo', 'Centro', '150', 'Av. São João', 25, 1),
('20040002', 'Rio de Janeiro', 'Centro', '210', 'Rua da Quitanda', 19, 2),
('30110015', 'Belo Horizonte', 'Savassi', '500', 'Rua Pernambuco', 13, 3),
('80010020', 'Curitiba', 'Batel', '820', 'Av. Batel', 16, 4);

-- 9) ENDEREÇOS DOS PARTICIPANTES
INSERT INTO tb_endereco_participante (cep, cidade, bairro, numero, logradouro, id_uf, id_participante) VALUES
('04849000', 'Itapevi', 'Suburbano', '2150', 'Rua das Palmeiras', 25, 3),
('22041001', 'Jandira', 'Centro', '450', 'Avenida Brasil', 25, 2),
('30140120', 'Itapevi', 'Rosemary', '374', 'Rua Serra do Paracaima', 25, 1),
('01503000', 'São Paulo', 'Liberdade', '55', 'Rua da Liberdade', 25, 4),
('51011020', 'Recife', 'Boa Viagem', '999', 'Rua do Sol', 5, 5);

-- 10) ENDEREÇOS DE EVENTO
INSERT INTO tb_endereco_evento (cep, logradouro, cidade, bairro, numero, id_uf) VALUES
('05653070', 'Praça Roberto Gomes Pedrosa', 'São Paulo', 'Morumbi', '1', 25),
('40020000', 'Av. Sete de Setembro', 'Salvador', 'Centro', '200', 5),
('80015120', 'Rua Coronel Dulcídio', 'Curitiba', 'Batel', '900', 16);

-- 11) EVENTOS
INSERT INTO tb_evento (nome, descricao, capa_url, data, id_organizador, id_status_evento, id_endereco_evento) VALUES
('Rock Sunset Festival','Show ao ar livre com diversas bandas de rock, food trucks e atividades culturais.','https://lh3.googleusercontent.com/gg-dl/ABS2GSkMgDXu5seSL_lC4hPk9vO0jsq3zhUvS39bA3qGdqYYchRgqntj74yLVMqwce2OLEXjeudY70zknjQ7RtL-yC4OgRJxZQa54zelPMyxOOJVrMBwolbWq_gu7FY5Oi_8FOns1125WLgAts0-KRsiHFw7TT4ON8rT7sCuZ45Fvar8kxBp=s1024-rj','2025-12-31',1,1,1),
('Cosplay World Expo','Convenção de cosplay com concursos, estandes e workshops.','https://example.com/cosplay.jpg','2025-09-14',2,1,2);

-- 12) SETORES
INSERT INTO tb_setor (nome, capacidade, id_evento, capacidade_atual) VALUES
('Pista', 2000, 1, 2000),
('VIP', 200, 1, 200),
('Backstage', 100, 1, 100),
('Estande Geral', 1500, 2, 1500),
('Área VIP', 150, 2, 150);

-- 13) LOTES DE INGRESSO
INSERT INTO tb_lote_ingresso (numero, quantidade, valor, data_inicio_venda, disponibilidade, id_setor, id_tipo) VALUES
(1, 1000, 150.00, '2025-10-01', TRUE, 1, 1),
(1, 150, 400.00, '2025-10-01', TRUE, 2, 2),
(1, 80, 700.00, '2025-10-10', TRUE, 3, 3);

-- 14) PEDIDOS
INSERT INTO tb_pedido (data_pagamento, total, id_participante, id_forma_pagamento) VALUES
('2025-10-05', 300.00, 1, 1),
('2025-10-06', 400.00, 2, 2),
('2025-10-07', 700.00, 3, 1);

-- 15) ITENS DO PEDIDO
INSERT INTO tb_ingressos_pedido (id_lote_ingresso, id_pedido, quantidade) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1);

-- 16) RELACIONAMENTO EVENTO-CATEGORIA
INSERT INTO tb_categoria_evento (categoria_id, evento_id) VALUES
(1, 1),
(8, 1),
(4, 2),
(10, 2);
