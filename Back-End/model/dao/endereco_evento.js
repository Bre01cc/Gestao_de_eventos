/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Endereços dos Eventos 
 * Data: 09/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Endereços Referente aos Organizadores no BD
const getAllEventsAddresses = async function(){
    try{
        let sql = `select * from tb_endereco_evento order by id desc`

        let result = await prisma.$queryRaw(sql) 
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um Endereço de organizador filtrando pelo ID do Endereço
const getEventAddressByAddressID = async function(id){
    try {
        let sql = `select * from tb_endereco_evento where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Endereço de organizador filtrando pelo ID do Organizador
const getEventAddressByEventID = async function(eventoID){
    try {
        let sql = `select * from tb_endereco_evento where id_evento = ${eventoID}`

        let result = await prisma.$queryRawUnsafe(sql)
    
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
        let sql = `select id from tb_endereco_evento order by id desc limit 1;`

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
const insertEventAddress = async function(endereco){
    try {
        let sql = `insert into tb_endereco_evento(
                    cep,
                    cidade,
                    bairro,
                    numero,
                    logradouro,
                    id_uf,
                    id_evento)
                values ('${endereco.cep}',
                        '${endereco.cidade}',
                        '${endereco.bairro}',
                        '${endereco.numero}',
                        '${endereco.logradouro}',
                        '${endereco.id_uf}',
                        '${endereco.id_evento}');`
    
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

//Altera um Endereço de um Organizador
const updateEventAddress = async function(endereco){
    try {
        let sql = `update tb_endereco_evento set
                        cep = '${endereco.cep}',
                        cidade = '${endereco.cidade}',
                        bairro = '${endereco.bairro}',
                        numero = '${endereco.numero}',
                        logradouro = '${endereco.logradouro}',
                        id_uf = '${endereco.id_uf}',
                        id_evento = '${endereco.id_evento}'
                    where id = ${endereco.id};`
    
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

module.exports ={
    getAllEventsAddresses,
    getEventAddressByAddressID,
    getEventAddressByEventID,
    getLastId,
    insertEventAddress,
    updateEventAddress
}

