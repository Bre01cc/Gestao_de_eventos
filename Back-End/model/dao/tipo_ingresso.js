/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tipos de ingressos. 
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os ingressos no BD
const getAllTicket = async function(){
    try{
        let result = await prisma.$queryRaw`select * from tb_tipo_ingresso order by id desc`
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um tipo de ingresso filtrando pelo ID
const getTicketById = async function(id){
    try {
        let result = await prisma.$queryRaw`select * from tb_tipo_ingresso where id = ${id}`

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último ID gerado no BD
const getLastId = async function(){
    try {
        //Script SQL que retorna apenas o último ID do BD
        let sql = `select id from tb_tipo_ingresso order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}



//Exclui um ingresso pelo ID no Banco de Dados
const deleteTicket = async function(id){
    try {

        let sql = `delete from tb_tipo_ingresso where id = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports ={
    
}