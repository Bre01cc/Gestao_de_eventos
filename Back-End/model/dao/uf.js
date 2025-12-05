/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente as UF'S
 * Data: 27/11/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todas as uf's
const getAllUfs = async function(){
    try{
        let sql = `select * from tb_uf order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna uma UF filtrando por ID
const getUfByID = async function(id){
    try{
        let sql = `select * from tb_uf where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

module.exports = {
    getAllUfs,
    getUfByID
}