/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Organizadores de Eventos 
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Organizadores no BD
const getAllOrganizers = async function(){
    try{
        let result = await prisma.$queryRaw(`select * from tb_organizador order by id desc`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um organizador filtrando pelo ID
const getOrganizerById = async function(id){
    try {
        let result = await prisma.$queryRaw(`select * from tb_organizador where id = ${id}`)

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
        let sql = `select id from tb_organizador order by id desc limit 1;`

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
const insertOrganizer = async function(organizador){
    try {
        let sql = `insert into tb_organizador(
                    nome_fantasia,
                    razao_social,
                    cnpj,
                    email,
                    telefone,
                    senha)
                values ('${organizador.nome_fantasia}',
                        '${organizador.razao_social}',
                        '${organizador.cnpj}',
                        '${organizador.email}',
                        '${organizador.telefone}',
                        '${organizador.senha}');`
    
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
const updateOrganizaer = async function(organizador){
    try {
        let sql = `update tb_organizador set
                        nome_fantasia = '${organizador.nome_fantasia}',
                        razao_social = '${organizador.razao_social}',
                        cnpj = '${organizador.cnpj}',
                        email = '${organizador.email}',
                        telefone = '${organizador.telefone}',
                        senha = '${organizador.senha}'
                    where id = ${organizador.id};`
                
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
const deleteOrganizer = async function(id){
    try {

        let sql = `delete from tb_organizador where id = ${id}`
        
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
    getAllOrganizers,
    getOrganizerById,
    getLastId,
    insertOrganizer,
    updateOrganizaer,
    deleteOrganizer
}