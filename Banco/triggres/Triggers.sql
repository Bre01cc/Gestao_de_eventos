-- Impedir que seja cadastrado um lote maior que a capacidade disponível --
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
-----------------------------------------------------------------------------------------------------------------------------
-- Atualizar capacidade automaticamente ao cadastrar um lote --
DELIMITER $$

CREATE TRIGGER lote_insert
BEFORE INSERT ON tb_lote_ingresso
FOR EACH ROW
BEGIN
    DECLARE capacidade_disponivel INT;

    -- pegar capacidade atual do setor
    SELECT capacidade_atual INTO capacidade_disponivel
    FROM tb_setor
    WHERE id = NEW.id_setor;

    -- validar capacidade
    IF NEW.quantidade > capacidade_disponivel THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quantidade excede a capacidade atual do setor!';
    END IF;

    -- atualizar capacidade (somente se passar na validação)
    UPDATE tb_setor
    SET capacidade_atual = capacidade_atual - NEW.quantidade
    WHERE id = NEW.id_setor;
END$$

DELIMITER ;
-----------------------------------------------------------------------------------------------------------------------------
-- Definir capacidade_atual = capacidade --
DELIMITER $$

CREATE TRIGGER trg_setor_define_capacidade_atual
BEFORE INSERT ON tb_setor
FOR EACH ROW
BEGIN
    SET NEW.capacidade_atual = NEW.capacidade;
END $$

DELIMITER ;