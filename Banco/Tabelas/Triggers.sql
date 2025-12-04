DELIMITER $$

CREATE TRIGGER trg_valida_capacidade_lote
BEFORE INSERT ON tb_lote_ingresso
FOR EACH ROW
BEGIN
DECLARE capacidade_disponivel INT;
SELECT capacidade_atual INTO capacidade_disponivel
FROM tb_setor
WHERE id = NEW.id_setor;

IF NEW.quantidade > capacidade_disponivel THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Quantidade excede a capacidade atual do setor!';
END IF;
END$$

DELIMITER ;