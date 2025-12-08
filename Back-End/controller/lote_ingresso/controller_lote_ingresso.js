/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao lote ingresso
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/
const loteIngresso = require('../../model/dao/lote_ingresso.js')
const controllerTipoIngresso = require('../tipo_ingresso/controller_tipo_ingresso.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listTicketLots = async function () {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultloteIngresso = await loteIngresso.getAllTicketLot()

        if (resultloteIngresso) {
            if (resultloteIngresso != null && resultloteIngresso.length > 0) {
                resultloteIngresso = formatarArray(resultloteIngresso)
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lote_ingresso = resultloteIngresso

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
const listTicketLotById = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultloteIngresso = await loteIngresso.getTicketLotById(id)

            if (resultloteIngresso) {

                if (resultloteIngresso != null && resultloteIngresso.length > 0) {
                    resultloteIngresso = formatarArray(resultloteIngresso)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.lote_ingresso = resultloteIngresso

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

const listTicketLotByIdSector = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultloteIngresso = await loteIngresso.getTicketLotByIdSector(id)

            if (resultloteIngresso) {

                if (resultloteIngresso != null && resultloteIngresso.length > 0) {
                    resultloteIngresso = formatarArray(resultloteIngresso)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.lote_ingresso = resultloteIngresso

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

const listTicketLotByIdType = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultloteIngresso = await loteIngresso.getTicketLotByIdTicketType(id)

            if (resultloteIngresso) {

                if (resultloteIngresso != null && resultloteIngresso.length > 0) {
                    resultloteIngresso = formatarArray(resultloteIngresso)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.lote_ingresso = resultloteIngresso

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

const listTicketLotByIdEvent = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultloteIngresso = await loteIngresso.getTicketLotByIdEvent(id)

            if (resultloteIngresso) {

                if (resultloteIngresso != null && resultloteIngresso.length > 0) {
                    resultloteIngresso = formatarArray(resultloteIngresso)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.lote_ingresso = resultloteIngresso

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

const setTicketLot = async function (lote, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarLoteIngresso(lote)
            if (!validar) {

                let validarIDTipoIngresso = await controllerTipoIngresso.listTicketByID(lote.id_tipo)
                
                if (validarIDTipoIngresso.status_code != 200) {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id tipo ingresso não foi encontrado]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS
                }


                let resultloteIngresso = await loteIngresso.insertTicketLot(lote)

                if (resultloteIngresso) {

                    let lastId = await loteIngresso.getLastId()

                    if (lastId) {
                        lote.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.lote_ingresso = lote

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

const setUpdatTicketLot = async function (lote, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
         
            let validar = await validarLoteIngresso(lote)
            if (!validar) {
                let validarID = await listTicketLotById(id)

                if (validarID.status_code == 200) {

                    let validarIDTipoIngresso = await controllerTipoIngresso.listTicketByID(lote.id_tipo)
                 
                    if (validarIDTipoIngresso.status_code != 200) {
                        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id tipo ingresso não foi encontrado]'
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }

                    lote.id = id
                    let resultloteIngresso = await loteIngresso.updateTicketLot(lote)
                    if (resultloteIngresso) {
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.lote_ingresso = lote

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

const validarLoteIngresso = async function (lote) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (lote.numero == '' || lote.numero == undefined || lote.numero == null || isNaN(lote.numero) || lote.numero <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [numero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else if (lote.quantidade == '' || lote.quantidade == undefined || lote.quantidade == null || isNaN(lote.quantidade) || lote.quantidade <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [quantidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else if (lote.valor == '' || lote.valor == undefined || lote.valor == null || isNaN(lote.valor) || Number(lote.valor) <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [valor incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else if (lote.data_inicio_venda == '' || lote.data_inicio_venda == undefined || lote.data_inicio_venda == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [data_inicio_venda incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else if (lote.id_setor == '' || lote.id_setor == undefined || lote.id_setor == null || isNaN(lote.id_setor) || lote.id_setor <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_setor incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else if (lote.id_tipo == '' || lote.id_tipo == undefined || lote.id_tipo == null || isNaN(lote.id_tipo) || lote.id_tipo <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_tipo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}


const formatarArray = (array) => {
    array.forEach(loteIngresso => {

        loteIngresso.tipo_ingresso = []
        loteIngresso.tipo_ingresso.push({
            id: loteIngresso.id_tipo_ingresso,
            nome: loteIngresso.tipo
        })

        delete loteIngresso.id_tipo_ingresso
        delete loteIngresso.tipo

        loteIngresso.setor = []
        loteIngresso.setor.push(
            {
                id: loteIngresso.id_setor,
                nome: loteIngresso.nome_setor
            })
        delete loteIngresso.id_setor
        delete loteIngresso.nome_setor

        loteIngresso.evento = []
        loteIngresso.evento.push({
            id: loteIngresso.id_evento,
            nome: loteIngresso.nome_evento
        })

        delete loteIngresso.id_evento
        delete loteIngresso.nome_evento

    });
    return array
}

module.exports = {
    listTicketLots,
    listTicketLotById,
    listTicketLotByIdSector,
    listTicketLotByIdType,
    listTicketLotByIdEvent,
    setTicketLot,
    setUpdatTicketLot
}