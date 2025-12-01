/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo GET de dados no MySQL referente aos status de Eventos
 * Data: 27/11/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os status de Evento do BD
const getAllEventStats = async function(){
    try{
        let result = await prisma.$queryRaw(`select * from tb_status_evento order by id desc`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um status de Evento filtrando por ID
const getEventStatsByID = async function(id){
    try{
        let result = await prisma.$queryRaw(`select * from tb_status_evento where id = ${id}`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

module.exports = {
    getAllEventStats,
    getEventStatsByID
}