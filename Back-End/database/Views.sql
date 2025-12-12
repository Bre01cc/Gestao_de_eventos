CREATE VIEW vw_evento_endereco as
SELECT 
    evento.id,
    evento.nome,
    evento.descricao,
    evento.capa_url,
    evento.data,
    endereco.logradouro,
    endereco.numero,
    endereco.bairro,
    uf.sigla,
    organizador.id id_organizador,
    organizador.nome_fantasia,
    status.id id_status,
    status.nome status
FROM tb_evento evento
JOIN tb_endereco_evento endereco 
    ON evento.id = endereco.id_evento JOIN tb_uf  uf ON endereco.id_uf = uf.id
		JOIN tb_organizador organizador ON organizador.id = evento.id_organizador
			JOIN tb_status_evento status ON status.id = evento.id_status_evento;

-- Visualizar organizador com endereço
CREATE VIEW vw_organizador_endereco as
SELECT 
    organizador.id,
    organizador.nome_fantasia,
    organizador.razao_social,
    organizador.email,
    organizador.cnpj,
    organizador.telefone,
    endereco.cep,
    endereco.cidade,
    uf.id id_uf,
    uf.sigla,
    endereco.bairro,
    endereco.numero,
    endereco.logradouro
FROM tb_organizador organizador
JOIN tb_endereco_organizador endereco 
    ON organizador.id = endereco.id_organizador JOIN tb_uf  uf ON endereco.id_uf = uf.id;



-- Visualizar todos os detalhes de um Pedido
CREATE VIEW vw_detalhes_pedido as            
SELECT
	pedido.id id_pedido,
    participante.id id_participante,
	evento.nome evento,
    tipo_ingresso.tipo,
    setor.nome setor,
    ingressos.quantidade,
	lote.valor valor_unitário,
	pedido.total,
    pedido.data_pagamento,
	pagamento.nome forma_pagamento,
	participante.nome, 
	participante.cpf
FROM tb_pedido pedido JOIN tb_participante participante
	ON participante.id = pedido.id_participante 
		JOIN tb_forma_pagamento pagamento 
			ON pagamento.id = pedido.id_forma_pagamento 
				JOIN tb_ingressos_pedido ingressos ON pedido.id = ingressos.id_pedido
					JOIN tb_lote_ingresso lote ON lote.id = ingressos.id_lote_ingresso
						JOIN tb_tipo_ingresso tipo_ingresso ON tipo_ingresso.id = lote.id_tipo
							JOIN tb_setor setor ON setor.id = lote.id_setor JOIN tb_evento evento
								ON evento.id = setor.id_evento;
							


CREATE VIEW vw_eventos_categorias AS
SELECT 
	ce.id as id,
    evento.id AS evento_id,
    evento.nome AS evento_nome,
    categoria.id AS categoria_id,
    categoria.nome AS categoria_nome
FROM tb_categoria_evento ce
JOIN tb_evento evento ON evento.id = ce.evento_id
JOIN tb_categoria categoria ON categoria.id = ce.categoria_id;



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
