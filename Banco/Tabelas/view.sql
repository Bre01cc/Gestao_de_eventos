-- VISUALIZAR AS INFORMAÇÕES DO PEDIDO
CREATE VIEW vw_pedido_dados AS
SELECT 
    pedido.id,
    pedido.data_pagamento,
    pedido.total,
    participante.id AS id_participante,
    participante.nome,
    pagamento.id AS id_forma_pagamento,
    pagamento.nome AS pagamento
FROM tb_participante participante
JOIN tb_pedido pedido 
        ON participante.id = pedido.id_participante
JOIN tb_forma_pagamento pagamento 
        ON pagamento.id = pedido.id_forma_pagamento;


-- VISUALIZAR OS DADOS DO PARTICIPANTE JUNTAMENTE COM O ENDEREÇO
CREATE VIEW vw_endereco_participante AS
SELECT
    participante.id AS id,
    participante.nome AS participante,
    participante.cpf,
    participante.data_nascimento,
    participante.telefone,
    participante.status,
    participante.email,
    participante.senha,
    endereco.id AS id_endereco,
    endereco.cep,
    endereco.cidade,
    endereco.id_uf,
    uf.sigla,
    endereco.bairro,
    endereco.numero,
    endereco.logradouro
FROM tb_participante participante
JOIN tb_endereco_participante endereco
        ON participante.id = endereco.id_participante
JOIN tb_uf uf
        ON endereco.id_uf = uf.id;


-- VISUALIZAR AS INFORMAÇÕES DO ENDEREÇO COM ALGUNS DADOS DO PARTICIPANTE
CREATE VIEW vw_participante_endereco AS
SELECT 
    endereco.id,
    endereco.cep,
    endereco.cidade,
    uf.sigla,
    endereco.id_uf,
    endereco.bairro,
    endereco.numero,
    endereco.logradouro,
    participante.id AS id_participante,
    participante.nome AS participante,
    participante.status
FROM tb_participante participante
JOIN tb_endereco_participante endereco 
        ON participante.id = endereco.id_participante
JOIN tb_uf uf 
        ON endereco.id_uf = uf.id;


-- Visualizar os dados da tabela relacional ingressos_pedido
CREATE VIEW vw_detalhes_pedido AS            
SELECT
    ingressos.id,
    ingressos.quantidade,
    lote.id AS id_lote_ingresso,
    lote.valor AS valor_unitario,
    tipo_ingresso.id AS id_tipo_ingresso,
    tipo_ingresso.tipo,
    pedido.id AS id_pedido,
    pedido.data_pagamento,
    pedido.total AS total_pedido,
    pagamento.id AS id_forma_pagamento,
    pagamento.nome AS forma_pagamento,
    setor.id AS id_setor,
    setor.nome AS setor,
    evento.id AS id_evento,
    evento.nome AS evento,
    participante.id AS id_participante,
    participante.nome
FROM tb_pedido pedido 
JOIN tb_participante participante
        ON participante.id = pedido.id_participante
JOIN tb_forma_pagamento pagamento 
        ON pagamento.id = pedido.id_forma_pagamento
JOIN tb_ingressos_pedido ingressos 
        ON pedido.id = ingressos.id_pedido
JOIN tb_lote_ingresso lote 
        ON lote.id = ingressos.id_lote_ingresso
JOIN tb_tipo_ingresso tipo_ingresso 
        ON tipo_ingresso.id = lote.id_tipo
JOIN tb_setor setor 
        ON setor.id = lote.id_setor
JOIN tb_evento evento
        ON evento.id = setor.id_evento;


-- DETALHES DO LOTE DE INGRESSO
CREATE VIEW vw_detalhes_lote AS            
SELECT 
    lote.id,
    lote.quantidade,
    lote.valor,
    lote.data_inicio_venda,
    lote.disponibilidade,
    setor.id AS id_setor,
    setor.nome AS nome_setor,
    evento.id AS id_evento,
    evento.nome AS nome_evento,
    tipo_ingresso.id AS id_tipo_ingresso,
    tipo_ingresso.tipo 
FROM tb_lote_ingresso lote 
JOIN tb_tipo_ingresso tipo_ingresso 
        ON tipo_ingresso.id = lote.id_tipo
JOIN tb_setor setor 
        ON setor.id = lote.id_setor
JOIN tb_evento evento 
        ON evento.id = setor.id_evento;

-- View com detalhes do setor
create view vw_setor
as
select
setor.id,
setor.nome,
setor.capacidade,
setor.capacidade_atual,
evento.id id_evento,
evento.nome nome_evento
from tb_setor setor join tb_evento evento on
evento.id = setor.id_evento;
