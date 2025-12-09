/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Setor
 * Data: 09/12/2025
 * Autor: Weslei Santos
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os setores no BD
const getAllSetor = async function () {
    try {
        let result = await prisma.$queryRaw`select * from vw_setor order by id desc;`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um setor filtrando pelo ID
const getSetorById = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_setor where id = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna setor pelo id do evento
const getSetorByIdEvent = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_setor where id_evento = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último ID gerado no BD
const getLastId = async function () {
    try {
        //Script SQL que retorna apenas o último ID do BD


        let result = await prisma.$queryRaw`select id from tb_setor order by id desc limit 1;`

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um setor no BD
const insertSetor = async function (setor) {
    try {


        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    INSERT INTO tb_setor(
        nome,
        capacidade,
        id_evento,
        capacidade_atual
    )
    VALUES (
        ${setor.nome},
        ${setor.capacidade},
        ${setor.id_evento},
        ${setor.capacidade_atual}
    );
`;


        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um setor
const updateSetor = async function (setor) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    UPDATE tb_setor SET
        nome = ${setor.nome},
        capacidade = ${setor.capacidade},
        id_evento = ${setor.id_evento},
        capacidade_atual = ${setor.capacidade_atual}
    WHERE id = ${setor.id};
`;
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    getAllSetor,
    getSetorById,
    getLastId,
    insertSetor,
    updateSetor,
    getSetorById,
    getSetorByIdEvent
}