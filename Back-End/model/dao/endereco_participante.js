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
        let result = await prisma.$queryRaw`select * from  vw_participante_endereco order by id desc`
        
        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        console.log(error)
        return false
    }
}

//Retorna um Endereço de Participante filtrando pelo ID do Endereço
const getParticipantAddressByAddressID = async function(id){
    try {
        let result = await prisma.$queryRaw`select * from vw_participante_endereco where id = ${id}`

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Endereço de participante filtrando pelo ID do participante
const getParticipantAddressByParticipantID = async function(participanteID){
    try {
        let result = await prisma.$queryRaw`select * from vw_participante_endereco where id = ${participanteID}`

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

//Inseri um Endereço do participantes no BD
const insertParticipantsAddresses = async function (endereco) {
    try {
        let result = await prisma.$executeRaw`
            INSERT INTO tb_endereco_participante (
                cep,
                cidade,
                bairro,
                numero,
                logradouro,
                id_uf,
                id_participante
            ) VALUES (
                ${endereco.cep},
                ${endereco.cidade},
                ${endereco.bairro},
                ${endereco.numero},
                ${endereco.logradouro},
                ${endereco.id_uf},
                ${endereco.id_participante}
            );
        `;

        if (result > 0)
            return true;
        else
            return false;

    } catch (error) {
        
        return false;
    }
};


//Altera o Endereço de um participante
const updateParticipantsAddresses = async function (endereco) {
    try {
        let result = await prisma.$executeRaw`
            UPDATE tb_endereco_participante
            SET
                cep = ${endereco.cep},
                cidade = ${endereco.cidade},
                bairro = ${endereco.bairro},
                numero = ${endereco.numero},
                logradouro = ${endereco.logradouro},
                id_uf = ${endereco.id_uf},
                id_participante = ${endereco.id_participante}
            WHERE id = ${endereco.id};
        `;

        return result > 0;

    } catch (error) {
       
        return false;
    }
};


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
module.exports = {
    getAllParticipantsAddresses,
    getParticipantAddressByAddressID,
    getParticipantAddressByParticipantID,
    deleteParticipantAddress,
    getLastId,
    insertParticipantsAddresses,
    updateParticipantsAddresses
}