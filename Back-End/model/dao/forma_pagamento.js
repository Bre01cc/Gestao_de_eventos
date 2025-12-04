/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente as formas de pagamento
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todas as formas de pagamento
const getAllPayments = async function () {
    try {
        let result = await prisma.$queryRaw`select * from tb_forma_pagamento order by id desc`;

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma UF filtrando por ID
const getPaymentsByID = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from tb_forma_pagamento where id = ${id}`;

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports ={
    getAllPayments,
    getPaymentsByID
}