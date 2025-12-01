/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Endereços de Organizadores 
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Endereços Referente aos Organizadores no BD
const getAllOrganizersAddresses = async function(){
    try{
        let result = await prisma.$queryRaw(`select * from tb_endereco_organizador order by id desc`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um Endereço de organizador filtrando pelo ID do Endereço
const getOrganizerAddressByAddressID = async function(id){
    try {
        let result = await prisma.$queryRaw(`select * from tb_endereco_organizador where id = ${id}`)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Endereço de organizador filtrando pelo ID do Organizador
const getOrganizerAddressByOrganizerID = async function(organizerID){
    try {
        let result = await prisma.$queryRaw(`select * from tb_endereco_organizador where id_organizador = ${organizerID}`)

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
        let sql = `select id from tb_endereco_organizador order by id desc limit 1;`

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
const insertOrganizerAddress = async function(endereco){
    try {
        let sql = `insert into tb_organizador(
                    cep,
                    cidade,
                    bairro,
                    numero,
                    endereco,
                    id_uf,
                    id_organizador)
                values ('${endereco.cep}',
                        '${endereco.cidade}',
                        '${endereco.bairro}',
                        '${endereco.numero}',
                        '${endereco.endereco}',
                        '${endereco.id_uf}',
                        '${endereco.id_organizador}');`
    
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
const updateOrganizerAddress = async function(endereco){
    try {
        let sql = `update tb_organizador set
                        cep = '${endereco.cep}',
                        cidade = '${endereco.cidade}',
                        bairro = '${endereco.bairro}',
                        numero = '${endereco.numero}',
                        endereco = '${endereco.endereco}',
                        id_uf = '${endereco.id_uf}',
                        id_organizador = '${endereco.id_organizador}'
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

module.exports = {
    getAllOrganizersAddresses,
    getOrganizerAddressByAddressID,
    getOrganizerAddressByOrganizerID,
    getLastId,
    insertOrganizerAddress,
    updateOrganizerAddress
}