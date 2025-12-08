/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente ao pedido
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os pedidos
const getAllOrder = async function () {
    try {
        let result = await prisma.$queryRaw`select * from vw_pedido_dados order by id desc;`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um pedido filtrando pelo ID
const getOrderById = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_pedido_dados where id = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um pedido filtrando pelo ID do participante
const getOrderByIdParticipant = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_pedido_dados where id_participante = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um pedido filtrando pelo ID da forma de pagamento
const getOrderByIdPayment = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from vw_pedido_dados where id_forma_pagamento = ${id}`

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

        let sql = `select id from vw_pedido_dados order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um pedido no BD
const insertOrder = async function (pedido) {
    try {


        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    INSERT INTO tb_pedido (
        data_pagamento,
        total,
        id_participante,
        id_forma_pagamento
    )
    VALUES (
        ${pedido.data_pagamento},
        ${pedido.total},
        ${pedido.id_participante},
        ${pedido.id_forma_pagamento}
    );`


        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um pedido
const updateOrder = async function (pedido) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`
    UPDATE tb_pedido
    SET
        data_pagamento = ${pedido.data_pagamento},
        total = ${pedido.total},
        id_participante = ${pedido.id_participante},
        id_forma_pagamento = ${pedido.id_forma_pagamento}
    WHERE id = ${pedido.id};
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
    getAllOrder,
    getOrderById,
    getOrderByIdParticipant,
    getOrderByIdPayment,
    insertOrder,
    updateOrder,
    getLastId
}