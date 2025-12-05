
-- Visualizar organizador com endereço
CREATE VIEW vw_organizador_endereco as
SELECT 
    organizador.id,
    organizador.nome_fantasia,
    organizador.razao_social,
    organizador.email,
    organizador.telefone,
    endereco.cep,
    endereco.cidade,
    uf.sigla,
    endereco.bairro,
    endereco.numero,
    endereco.logradouro,
    endereco.id_organizador
FROM tb_organizador organizador
JOIN tb_endereco_organizador endereco 
    ON organizador.id = endereco.id_organizador JOIN tb_uf  uf ON endereco.id_uf = uf.id;
    
select * from vw_organizador_endereco;
select * from vw_organizador_endereco where id_organizador = 2;

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

SELECT * FROM vw_detalhes_pedido;


