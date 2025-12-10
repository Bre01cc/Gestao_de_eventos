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
        let resultSetor = await setorDAO.getAllSetor()

        if (resultSetor) {

            if (resultSetor != null && resultSetor.length > 0) {
                resultSetor = formatarView(resultSetor)

                MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.setor = resultSetor

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
            let resultSetor = await setorDAO.getSetorById(id)

            if (resultSetor) {

                if (resultSetor != null && resultSetor.length > 0) {

                    resultSetor = formatarView(resultSetor)
                    MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.setor = resultSetor

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

const listSetorByIDEvent = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultSetor = await setorDAO.getSetorByIdEvent(id)

            if (resultSetor) {

                if (resultSetor != null && resultSetor.length > 0) {

                    resultSetor = formatarView(resultSetor)
                    MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.setor = resultSetor

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

const setSetor = async function (setor, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do setor
            let validar = await validarSetor(setor)
            if (!validar) {
                let resultSetor = await setorDAO.insertSetor(setor)

                if (resultSetor) {

                    let lastId = await setorDAO.getLastId()

                    if (lastId) {
                        setor.id = lastId

                        MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.setor = setor

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

const setUpdateSetor = async function (setor, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            let validar = await validarSetor(setor)
            if (!validar) {
                let validarID = await listSetorByID(id)

                if (validarID.status_code == 200) {
                    setor.id = id
                    let resultSetor = await setorDAO.updateSetor(setor)
                    if (resultSetor) {
                        MESSAGES.DEFAULT_HEADER.development = "Weslei Santos"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.setor = setor

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

const formatarView = (view) => {
    view.forEach(view => {
        view.evento = []
        view.evento.push({
            id: view.id_evento,
            nome: view.nome_evento
        })
        delete view.id_evento
        delete view.nome_evento
    })

    return view

}

// Função para validar todos os dados do setor enviado
const validarSetor = async function (setor) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação do nome
    if (setor.nome == '' || setor.nome == undefined || setor.nome == null || setor.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    // Validação da capacidade
    } else if (setor.capacidade == '' || setor.capacidade == undefined || setor.capacidade == null || isNaN(setor.capacidade)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [capacidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    // Validação do id_evento
    } else if (setor.id_evento == '' || setor.id_evento == undefined || setor.id_evento == null || isNaN(setor.id_evento)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_evento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    // Validação da capacidade_atual
    } else if (setor.capacidade_atual == '' || setor.capacidade_atual == undefined || setor.capacidade_atual == null || isNaN(setor.capacidade_atual)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [capacidade_atual incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
}

module.exports = {
    listSetorByID,
    listSetores,
    setSetor,
    setUpdateSetor,
    listSetorByIDEvent
}