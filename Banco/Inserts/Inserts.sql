-- INSERT DE ESTADOS(UF) --
INSERT INTO tb_uf (sigla) VALUES
('AC'), ('AL'), ('AP'), ('AM'), ('BA'), ('CE'),
('DF'), ('ES'), ('GO'), ('MA'), ('MT'), ('MS'),
('MG'), ('PA'), ('PB'),('PR'), ('PE'), ('PI'), 
('RJ'), ('RN'), ('RS'), ('RO'), ('RR'), ('SC'),
('SP'), ('SE'), ('TO');
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE PARTICIPANTES --
INSERT INTO tb_participante (nome, cpf, data_nascimento, telefone, email, senha, status) VALUES
('Weslei Santos', '12345678901', '2001-10-18', '(11)90000-0001', 'weslei.santos@email.com', 'senhaWeslei123', TRUE),
('Enzo Carrilho', '98765432100', '2005-09-25', '(11)90000-0002', 'enzo.carrilho@email.com', 'senhaCarrilho123', TRUE),
('Breno Assis', '65498732155', '2008-12-10', '(11)90000-0003', 'breno.Assis@email.com', 'senhaBreno123', TRUE),
('Ricardo Almeida', '11223344556', '1992-06-15', '(11)90000-0004', 'ricardo.almeida@email.com', 'senhaRicardo123', TRUE),
('Fernanda Costa', '33221144556', '1999-03-21', '(11)90000-0005', 'fernanda.costa@email.com', 'senhaFernanda123', TRUE);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE ORGANIZADORES --
INSERT INTO tb_organizador 
(nome_fantasia, razao_social, cnpj, email, telefone, senha)
VALUES
('Music Live', 'Music Live Produções LTDA', '10293847000188', 'contato@musiclive.com', '11999887766', 'music123'),
('Cosplay World', 'Cosplay World Eventos ME', '20394857000155', 'suporte@cosplayworld.com', '11988776655', 'cosplay123'),
('Game On Expo', 'Game On Feiras e Eventos LTDA', '30495876000144', 'contato@gameonexpo.com', '11977665544', 'game123'),
('Tech Future', 'Tech Future Eventos e Inovação SA', '40596835000122', 'eventos@techfuture.com', '11966554433', 'tech123');
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE ENDEREÇO DOS ORGANIZADORES --
INSERT INTO tb_endereco_organizador
(cep, cidade, bairro, numero, logradouro, id_uf, id_organizador)
VALUES
('01001000', 'São Paulo', 'Centro', '150', 'Av. São João', 25, 1),
('20040002', 'Rio de Janeiro', 'Centro', '210', 'Rua da Quitanda', 19, 2),
('30110015', 'Belo Horizonte', 'Savassi', '500', 'Rua Pernambuco', 13, 3),
('80010020', 'Curitiba', 'Batel', '820', 'Av. Batel', 16, 4);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE ENDEREÇO DOS PARTICIPANTES --
INSERT INTO tb_endereco_participante
(cep, cidade, bairro, numero, logradouro, id_uf, id_participante)
VALUES
('01001000', 'Itapevi', 'Suburbano', '2150', 'Rua das Palmeiras', 25, 3),
('22041001', 'Jandira', 'Centro', '450', 'Avenida Brasil', 25, 2),
('30140120', 'Itapevi', 'Rosemary ', '374', 'Rua Serra do Paracaima ', 25, 1),
('01503000', 'São Paulo', 'Liberdade', '55', 'Rua da Liberdade', 1, 4),
('51011020', 'Recife', 'Boa Viagem', '999', 'Rua do Sol', 4, 5);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE CATEGORIAS --
INSERT INTO tb_categoria (nome) VALUES
('Música'), ('Tecnologia'), ('Games'), ('Cosplay'),
('Teatro'), ('Esportes'), ('Palestra'), ('Festival'),
('Feira'), ('Cultura'), ('Bem-estar');
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE STATUS EVENTOS --
INSERT INTO tb_status_evento (nome)
VALUES 
('Ativo'),
('Cancelado'),
('Encerrado'),
('Esgotado');
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DO ENDEREÇO DO EVENTO  --
INSERT INTO tb_endereco_evento
(cep, logradouro, cidade, bairro, numero, id_uf)
VALUES
('05653070', 'Praça Roberto Gomes Pedrosa', 'São Paulo', 'Morumbi', '1', 25);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE EVENTOS --
INSERT INTO tb_evento
(nome, descricao, capa_url, data, id_organizador, id_status_evento, id_endereco_evento)
VALUES
(
    'Rock Sunset Festival',
    'Show ao ar livre com diversas bandas de rock, food trucks e atividades culturais.',
    'https://lh3.googleusercontent.com/gg-dl/ABS2GSkMgDXu5seSL_lC4hPk9vO0jsq3zhUvS39bA3qGdqYYchRgqntj74yLVMqwce2OLEXjeudY70zknjQ7RtL-yC4OgRJxZQa54zelPMyxOOJVrMBwolbWq_gu7FY5Oi_8FOns1125WLgAts0-KRsiHFw7TT4ON8rT7sCuZ45Fvar8kxBp=s1024-rj',
    '2025-12-31',
    1,
    1,
    1
);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE SETORES DO EVENTOS --
INSERT INTO tb_setor (nome, capacidade, id_evento)
VALUES 
('Pista', 200, 4),
('VIP', 50, 4),
('Backstage', 70, 4),
('Cadeira Térrea', 300, 4),
('Arquibancada Oeste', 400, 4);
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE LOTE INGRESSO --
INSERT INTO tb_lote_ingresso (lote, quantidade, valor, data_inicio_venda, 
								disponibilidade, id_setor, id_tipo)
VALUES
('1', '100', '300.00', '2025-12-01', TRUE, '7', '1'),
('1', '200', '200.00', '2025-12-01', TRUE, '13', '8'),
('1', '100', '150.00', '2025-12-04', TRUE, '14', '9');

delete from tb_lote_ingresso where id = 6;
-----------------------------------------------------------------------------------------------------------------------------
-- INSERT DE TIPO DE INGRESSO --
INSERT INTO tb_tipo_ingresso (tipo) VALUES
('Ingresso Geral'),
('Ingresso VIP'),
('Experiência Premium'),
('Ingresso Cadeira'),
('Ingresso Arquibancada');

select * from tb_tipo_ingresso;
select * from tb_lote_ingresso;
select * from tb_participante;
select * from tb_organizador;
select * from tb_evento;
select * from tb_setor;
select * from tb_uf ORDER BY id;
select * from tb_endereco_organizador;
select * from tb_endereco_participante;
select * from tb_endereco_evento;
select * from tb_categoria;