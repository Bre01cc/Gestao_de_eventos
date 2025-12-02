-- INSSERT DE ESTADOS(UF) --
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
('01001000', 'São Paulo', 'Centro', '150', 'Av. São João', 25, 1), -- Music Live
('20040002', 'Rio de Janeiro', 'Centro', '210', 'Rua da Quitanda', 19, 2), -- Cosplay World
('30110015', 'Belo Horizonte', 'Savassi', '500', 'Rua Pernambuco', 13, 3), -- Game On Expo
('80010020', 'Curitiba', 'Batel', '820', 'Av. Batel', 16, 4); -- Tech Future
-----------------------------------------------------------------------------------------------------------------------------
select * from tb_participante;
select * from tb_organizador;
select * from tb_uf;
select * from tb_endereco_organizador;