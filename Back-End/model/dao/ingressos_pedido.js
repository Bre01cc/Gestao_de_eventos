/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente ao ingressos pedido
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os ingressos_pedidos
const getAllOrderedTickets = async function () {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido order by id desc;`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um ingresso pedido filtrando pelo ID
const getOrderedTicketById = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido where id = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um pedido filtrando pelo ID do participante
const getOrderedTicketByIdParticipant = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido where id_participante = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna ingresso pedido filtrando pelo ID do pedido
const getOrderedTicketByIdOrder = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido where id_pedido = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna ingresso pedido filtrando pelo ID do evento
const getOrderedTicketByIdEvent = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido where id_evento = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna ingresso pedido filtrando pelo ID do lote
const getOrderedTicketByIdBatch = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_detalhes_pedido where id_lote_ingresso = ${id}`

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

        let sql = `select id from vw_detalhes_pedido order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um ingresso pedido  no BD
const insertOrderedTicket = async function (ingresso) {
    try {


        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    INSERT INTO tb_ingressos_pedido (
        id_lote_ingresso,
        id_pedido,
        quantidade
    )
    VALUES (
        ${ingresso.id_lote_ingresso},
        ${ingresso.id_pedido},
        ${ingresso.quantidade}
    );`

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um ingresso pedido
const updateOrderedTicket = async function (ingresso) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    UPDATE tb_ingressos_pedido
    SET
        id_lote_ingresso = ${ingresso.id_lote_ingresso},
        id_pedido = ${ingresso.id_pedido},
        quantidade = ${ingresso.quantidade}
    WHERE id = ${ingresso.id};`



        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getAllOrderedTickets,
    getOrderedTicketById,
    getLastId,
    getOrderedTicketByIdBatch,
    getOrderedTicketByIdEvent,
    getOrderedTicketByIdOrder,
    getOrderedTicketByIdParticipant,
    insertOrderedTicket,
    updateOrderedTicket
}