/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Endereços de Participantes
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Endereços Referente aos Participantes no BD
const getAllParticipantsAddresses = async function(){
    try{
        let result = await prisma.$queryRaw(`select * from tb_endereco_participante order by id desc`)
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return false
    }
}

//Retorna um Endereço de Participante filtrando pelo ID do Endereço
const getParticipantAddressByAddressID = async function(id){
    try {
        let result = await prisma.$queryRaw(`select * from tb_endereco_participante where id = ${id}`)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Endereço de participante filtrando pelo ID do participante
const getParticipantAddressByOrganizerID = async function(participanteID){
    try {
        let result = await prisma.$queryRaw(`select * from tb_endereco_participante where id_participante = ${participanteID}`)

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
      
        let sql = `select id from tb_endereco_participante order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Exclui um endereco do participante pelo ID no Banco de Dados
const deleteParticipantAddress = async function(id){
    try {

        let sql = `delete from tb_endereco_participante where id = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}