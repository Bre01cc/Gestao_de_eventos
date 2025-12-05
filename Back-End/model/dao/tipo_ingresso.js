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

        let result = await prisma.$queryRaw`select id from tb_tipo_ingresso order by id desc limit 1;`

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um tipo de ingresso no BD
const insertTicket = async function (tipoIngresso) {
    try {


        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`insert into tb_tipo_ingresso(tipo)
        values(
        ${tipoIngresso.tipo});
       `

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um tipo de ingresso
const updateTicket = async function (tipoIngresso) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`update tb_tipo_ingresso set
                        nome = ${tipoIngresso.tipo};`


        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Exclui um ingresso pelo ID no Banco de Dados
const deleteTicket = async function(id){
    try {
        
        let result = await prisma.$queryRaw`delete from tb_tipo_ingresso where id = ${id}`
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports ={
    getAllTicket,
    getLastId,
    getTicketById,
    deleteTicket,
    insertTicket,
    updateTicket
}