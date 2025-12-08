/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente a lote ingresso
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os lotes de ingresso
const getAllTicketLot = async function () {
    try {
        let result = await prisma.$queryRaw`select * from  vw_detalhes_lote order by id desc;`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um lote de ingresso filtrando pelo ID
const getTicketLotById = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_lote where id = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um lote de ingresso filtrando pelo ID do setor
const getTicketLotByIdSector = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_lote where id_setor = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um lote de ingressso filtrando pelo ID do tipo de ingresso
const getTicketLotByIdTicketType = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_lote where id_tipo_ingresso = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um lote de ingressso filtrando pelo ID do evento
const getTicketLotByIdEvent = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_lote where id_evento = ${id}`

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

        let sql = `select id from vw_detalhes_lote order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um lote ingresso no BD
const insertTicketLot = async function (lote) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    INSERT INTO tb_lote_ingresso (
        numero,
        quantidade,
        valor,
        data_inicio_venda,
        id_setor,
        id_tipo
    )
    VALUES (
        ${lote.numero},
        ${lote.quantidade},
        ${lote.valor},
        ${lote.data_inicio_venda},
        ${lote.id_setor},
        ${lote.id_tipo}
    );`
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um lote ingresso
const updateTicketLot = async function (lote) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    UPDATE tb_lote_ingresso SET
        numero = ${lote.numero},
        quantidade = ${lote.quantidade},
        valor = ${lote.valor},
        data_inicio_venda = ${lote.data_inicio_venda},
        id_setor = ${lote.id_setor},
        id_tipo = ${lote.id_tipo}
    WHERE id = ${lote.id};`

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getAllTicketLot,
    getTicketLotById,
    getLastId,
    getTicketLotByIdSector,
    getTicketLotByIdTicketType,
    getTicketLotByIdEvent,
    updateTicketLot,
    insertTicketLot
}