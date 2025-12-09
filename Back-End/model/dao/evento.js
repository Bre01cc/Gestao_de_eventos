/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Eventos 
 * Data: 09/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Organizadores no BD
const getAllEvents = async function(){
    try{
        let result = await prisma.$queryRaw(`select * from tb_evento order by id desc`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um organizador filtrando pelo ID
const getEventById = async function(id){
    try {
        let result = await prisma.$queryRaw(`select * from tb_evento where id = ${id}`)

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
        let sql = `select id from tb_evento order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Insere um Organizador novo no Banco de Dados
const insertEvent = async function(evento){
    try {
        let sql = `insert into tb_evento(
                    nome,
                    descricao,
                    capa_url,
                    data,
                    id_organizador,
                    id_status)
                values ('${evento.nome}',
                        '${evento.descricao}',
                        '${evento.capa_url}',
                        '${evento.data}',
                        '${evento.id_organizador}',
                        '${evento.id_status}');`
    
    //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

//Altera um Organizador
const updateEvent = async function(evento){
    try {
        let sql = `update tb_evento set
                        nome = '${evento.nome}',
                        descricao = '${evento.descricao}',
                        capa_url = '${evento.capa_url}',
                        data = '${evento.data}'
                    where id = ${evento.id};`
                
    //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}

//Exclui um organizador pelo ID no Banco de Dados
const deleteEvent = async function(id){
    try {

        let sql = `delete from tb_evento where id = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    getLastId,
    insertEvent,
    updateEvent,
    deleteEvent
}