/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao Endereço do Participante
 * Data: 04/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/
const enderecoParticipanteDAO = require('../../model/dao/endereco_participante.js')
const  controllerParticipante = require('./controller_participante.js')
const controllerUf = require('../uf/controller_uf.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listAdress = async function () {
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAdress = await enderecoParticipanteDAO.getAllParticipantsAddresses()
        // console.log(resultAdress)
        if (resultAdress) {
            if (resultAdress != null && resultAdress.length > 0) {
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.enderecos_participantes = resultAdress

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

const listAdressByID = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultAdress = await enderecoParticipanteDAO.getParticipantAddressByAddressID(id)

            if (resultAdress) {

                if (resultAdress != null && resultAdress.length > 0) {
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.endereco_participante = resultAdress

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const listAdressByParticipantID = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultAdress = await enderecoParticipanteDAO.getParticipantAddressByParticipantID(id)

            if (resultAdress) {

                if (resultAdress != null && resultAdress.length > 0) {
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.endereco_participante = resultAdress

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const setAdress = async function (enderecoParticipante, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do Organizador
            let validar = await validarAdress(enderecoParticipante)

            let validarIDParticipante = await controllerParticipante.listParticipantByID(enderecoParticipante.id_participante)
            // console.log(validarIDParticipante)
            if(validarIDParticipante.status_code != 200){
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id participante não foi encontrado]'
                return  MESSAGES.ERROR_REQUIRED_FIELDS
            }

            let validarIDUf = await controllerUf.listUfByID(enderecoParticipante.id_uf)
            
            if(validarIDUf.status_code != 200){
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id uf não foi encontrado]'
                return  MESSAGES.ERROR_REQUIRED_FIELDS
            }
           
            if (!validar) {
                let resultAdress = await enderecoParticipanteDAO.insertParticipantsAddresses(enderecoParticipante)

                if (resultAdress) {

                    let lastId = await enderecoParticipanteDAO.getLastId()

                    if (lastId) {
                        enderecoParticipante.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = enderecoParticipante

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

const setUpdateAdress = async function (organizador, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateOrganizer(organizador)
            if (!validate) {

                let validateID = await listOrganizerByID(id)
                if (validateID.status_code == 200) {

                    organizador.id = Number(id)

                    let resultOrganizer = await enderecoParticipanteDAO.updateOrganizaer(organizador)

                    if (resultOrganizer) {

                        organizador.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = organizador

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return validateID //Referente a validação da função de busca por ID poderá retornar (400 | 404 | 500)
                }

            } else {
                return validate //400 Referente a  validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const setDeleteAdress = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await listAdressByID(id)

        if (validarId.status_code == 200) {

            let resultAdress = await enderecoParticipanteDAO.deleteParticipantAddress(Number(id))


            if (resultAdress) {
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

// Função para validar todos os dados do organizador enviado
const validarAdress = async function (enderecoParticipante) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if (enderecoParticipante.cep == '' || enderecoParticipante.cep == undefined || enderecoParticipante.cep == null || enderecoParticipante.cep.length != 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CEP incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (enderecoParticipante.cidade == '' || enderecoParticipante.cidade == undefined || enderecoParticipante.cidade == null || enderecoParticipante.cidade.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (enderecoParticipante.bairro == '' || enderecoParticipante.bairro == undefined || enderecoParticipante.bairro == null || enderecoParticipante.bairro.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [bairro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if (enderecoParticipante.numero == '' || enderecoParticipante.numero == undefined || enderecoParticipante.numero == null || enderecoParticipante.numero.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [numero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (enderecoParticipante.endereco == '' || enderecoParticipante.endereco == undefined || enderecoParticipante.endereco == null || enderecoParticipante.endereco.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [endereco incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }
    else if (enderecoParticipante.logradouro == '' || enderecoParticipante.logradouro == undefined || enderecoParticipante.logradouro == null || enderecoParticipante.logradouro.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [logradouro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }

    else if (enderecoParticipante.id_participante <= 0 || isNaN(enderecoParticipante.id_participante) || enderecoParticipante.id_participante == undefined || enderecoParticipante.id_participante == null || enderecoParticipante.id_participante == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id participante incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (enderecoParticipante.id_uf <= 0 || isNaN(enderecoParticipante.id_uf) || enderecoParticipante.id_uf == undefined || enderecoParticipante.id_uf == null || enderecoParticipante.id_uf == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id uf incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        return false
    }

}

module.exports = {
    listAdress,
    listAdressByID,
    listAdressByParticipantID,
    setDeleteAdress,
    setUpdateAdress,
    setAdress
}