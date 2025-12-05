/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Participantes de Eventos 
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Participantes no BD
const getAllParticipants = async function () {
    try {
        let result = await prisma.$queryRaw`select * from tb_participante order by id desc`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Participante filtrando pelo ID
const getParticipantById = async function (id) {
    try {
        let result = await prisma.$queryRaw`select * from tb_participante where id = ${id}`

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último ID gerado no BD
const getLastId = async function () {
    try {
        //Script SQL que retorna apenas o último ID do BD


        let result = await prisma.$queryRaw`select id from tb_participante order by id desc limit 1;`

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Inseri um Participante no BD
const insertParticipant = async function (participante) {
    try {


        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`insert into tb_participante(
        nome,
        cpf,
        data_nascimento,
        email,
        telefone,
        senha)
    values (${participante.nome},
            ${participante.cpf},
            ${participante.data_nascimento},
            ${participante.email},
            ${participante.telefone},
            ${participante.senha});`

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um Participante
const updateParticipant = async function (participante) {
    try {
        //executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$queryRaw`update tb_participante set
                        nome = ${participante.nome},
                        cpf = ${participante.cpf},
                        data_nascimento = ${participante.data_nascimento},
                        email = ${participante.email},
                        telefone = ${participante.telefone},
                        senha = ${participante.senha}
                    where id = ${participante.id};`


        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


//Exclui um participante pelo ID no Banco de Dados
const deleteParticipant = async function (id) {
    try {
        let result = await prisma.$queryRaw `update tb_participante set
                        status = 0 where id = ${id} `
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getAllParticipants,
    getLastId,
    getParticipantById,
    deleteParticipant,
    insertParticipant,
    updateParticipant
}
