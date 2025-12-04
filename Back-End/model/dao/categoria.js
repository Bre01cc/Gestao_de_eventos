/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente a Categoria 
 * Data: 26/11/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Eventos no BD
const getAllCategorys = async function(){
    try{
        let sql = `select * from tb_categoria order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna uma categoria filtrando pelo ID
const getCategoryById = async function(id){
    try {
        let sql = `select * from tb_categoria where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    getAllCategorys,
    getCategoryById
}