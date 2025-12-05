/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao tipo de ingresso
 * Data: 04/12/2025
 * Autor: Breno 
 * Versão: 1.0
 ***********************************************************************************************************/
const tipoIngressoDAO = require('../../model/dao/tipo_ingresso.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listAllTicket = async function () {
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultTicket = await tipoIngressoDAO.getAllTicket()

        if (resultTicket) {
            if (resultTicket != null && resultTicket.length > 0) {
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.ticket = resultTicket

                return MESSAGES.DEFAULT_HEADER //200(sucesso)
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const listTicketByID = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultTicket = await tipoIngressoDAO.getTicketById(id)

            if (resultTicket) {

                if (resultTicket != null && resultTicket.length > 0) {
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ticket = resultTicket

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const setTicket = async function (tipoIngresso, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do tipoIngresso
            let validar = await validarTicket(tipoIngresso)
            if (!validar) {
                let resultTicket = await tipoIngressoDAO.insertTicket(tipoIngresso)

                if (resultTicket) {

                    let lastId = await tipoIngressoDAO.getLastId()

                    if (lastId) {
                        tipoIngresso.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.tipoIngresso = tipoIngresso

                        return MESSAGES.DEFAULT_HEADER

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const setUpdateTicket = async function (tipoIngresso, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do tipoIngresso
            let validar = await validarTicket(tipoIngresso)
            if (!validar) {
                let validarID = await listTicketByID(id)

                if (validarID.status_code == 200) {
                    tipoIngresso.id = id
                    let resultTicket = await tipoIngressoDAO.updateTicket(tipoIngresso)
                    if (resultTicket) {
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ticket = tipoIngresso

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return validarID //Referente a validação da função de busca por ID poderá retornar (400 | 404 | 500)
                }

            } else {
                return validarTicket //400 Referente a  validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const setDeleteTicket = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await listTicketByID(id)
        console.log(validarId)

        if (validarId.status_code == 200) {

            let resultTicket = await tipoIngressoDAO.deleteTicket(id)
            console.log(resultTicket)


            if (resultTicket) {
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        } else {
            return validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para validar todos os dados do tipo do ingresso enviado
const validarTicket = async function (tipoIngresso) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if (tipoIngresso.tipo == '' || tipoIngresso.tipo == undefined || tipoIngresso.tipo == null || tipoIngresso.tipo.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [tipo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }
    else{
        return false
    }

}

module.exports = {
listAllTicket,
listTicketByID,
setDeleteTicket,
setTicket,
setUpdateTicket
}