/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de evento e categoria
 * Data: 06/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os filmes e gêneros cadastrados no BD
const getllEventsCategorys = async function(){
    try {

        let sql = `select * from vw_eventos_categorias;`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Gênero Filtrando pelo ID
const getEventsCategorysByID = async function(id){
    try {
        let sql = `select * from vw_eventos_categorias where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de Gêneros filtrando pelo ID do filme
const getCategorysByEventID = async function(idEvento){
    try {
        let sql = `select * from vw_eventos_categorias where evento_id = ${idEvento};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de Filmes filtando pelo gênero
const getEventsByCategoryID = async function(idCategoria){
    try {
        let sql = `select * from vw_eventos_categorias where categoria_id = ${idCategoria};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último ID do Gênero Cadastrado
const getLastId = async function(){
    try {
        //Script SQL que retorna apenas o último ID do BD
        let sql = `select id from tb_categoria_evento order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

const insertEventCategory = async function(eventoCategoria){
    try {

        let sql = `INSERT INTO tb_categoria_evento (evento_id, categoria_id)
                    values( ${eventoCategoria.evento_id}, ${eventoCategoria.categoria_id} );`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const updateEventCategory = async function(eventoCategoria){
    try {
        let sql = `UPDATE tb_categoria_evento SET 
                    evento_id = ${eventoCategoria.evento_id} 
                    categoria_id = ${eventoCategoria.categoria_id} 
                    WHERE id = ${eventoCategoria.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
        
}

const deleteEventCategoryssByEventID = async function(id){
    try {
        
        let sql = `delete from tb_categoria_evento where evento_id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getllEventsCategorys,
    getEventsCategorysByID,
    getCategorysByEventID,
    getEventsByCategoryID,
    getLastId,
    insertEventCategory,
    updateEventCategory,
    deleteEventCategoryssByEventID
    
}