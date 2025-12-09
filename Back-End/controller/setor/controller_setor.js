/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao setor
 * Data: 09/12/2025
 * Autor: Weslei 
 * Versão: 1.0
 ***********************************************************************************************************/
const setorDAO = require('../../model/dao/setor.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listSetores = async function () {
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultParticipants = await participanteDAO.getAllParticipants()

        if (resultParticipants) {

            if (resultParticipants != null && resultParticipants.length > 0) {
                MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.participantes = resultParticipants

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

const listSetorByID = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultParticipant = await participanteDAO.getParticipantAdressById(id)
            if (resultParticipant.length == 0) {
                resultParticipant = await participanteDAO.getParticipantById(id)
            }

            if (resultParticipant) {

                if (resultParticipant != null && resultParticipant.length > 0) {

                    resultParticipant.forEach(participante => {
                        if ('id_endereco' in participante) {
                            participante.endereco = []
                            participante.endereco.push({
                                id: participante.id_endereco,
                                cep: participante.cep,
                                cidade: participante.cidade,
                                sigla: participante.sigla,
                                bairro: participante.bairro,
                                numero: participante.numero,
                                logradouro: participante.logradouro
                            })
                            delete participante.id_endereco
                            delete participante.cep
                            delete participante.cidade
                            delete participante.sigla
                            delete participante.bairro
                            delete participante.numero
                            delete participante.logradouro
                        }

                    })
                    MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.participante = resultParticipant

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

const setSetor = async function (participante, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do participante
            let validar = await validarParticipant(participante)
            if (!validar) {
                let resultParticipant = await participanteDAO.insertParticipant(participante)

                if (resultParticipant) {

                    let lastId = await participanteDAO.getLastId()

                    if (lastId) {
                        participante.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.participante = participante

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

const setUpdateSetor = async function (participante, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do participante
            let validar = await validarParticipant(participante)
            if (!validar) {
                let validarID = await listParticipantByID(id)

                if (validarID.status_code == 200) {
                    participante.id = id
                    let resultParticipant = await participanteDAO.updateParticipant(participante)
                    if (resultParticipant) {
                        MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.participante = participante

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return validarID //Referente a validação da função de busca por ID poderá retornar (400 | 404 | 500)
                }

            } else {
                return validar //400 Referente a  validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para validar todos os dados do participante enviado
const validarSetor = async function (participante) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if (participante.nome == '' || participante.nome == undefined || participante.nome == null || participante.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (participante.cpf == '' || participante.cpf == undefined || participante.cpf == null || participante.cpf.length != 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cpf incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (participante.data_nascimento == '' || participante.data_nascimento == undefined || participante.data_nascimento == null || participante.data_nascimento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [data nascimento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if (participante.email == '' || participante.email == undefined || participante.email == null || participante.email.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (participante.telefone == '' || participante.telefone == undefined || participante.telefone == null || participante.telefone.length > 20) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [telefone incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (participante.senha == '' || participante.senha == undefined || participante.senha == null || participante.senha.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [senha incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }

}

module.exports = {
    listSetorByID,
    listSetores,
    setSetor,
    setUpdateSetor,
}