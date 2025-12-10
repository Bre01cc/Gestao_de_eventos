/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao ingressos pedidos
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/
const ingressoPedido = require('../../model/dao/ingressos_pedido.js')
const controllerPedido = require('./controller_pedido.js')
const controllerLoteIngresso = require('../lote_ingresso/controller_lote_ingresso.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listOrderedTickets = async function () {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultIngressoPedido = await ingressoPedido.getAllOrderedTickets()

        if (resultIngressoPedido) {
            if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                resultIngressoPedido = formatarArray(resultIngressoPedido)
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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
const listOrderedTicketById = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultIngressoPedido = await ingressoPedido.getOrderedTicketById(id)

            if (resultIngressoPedido) {

                if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                    resultIngressoPedido = formatarArray(resultIngressoPedido)
                   
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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

const listOrderedTicketByIdParticipant = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultIngressoPedido = await ingressoPedido.getOrderedTicketByIdParticipant(id)

            if (resultIngressoPedido) {

                if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                    resultIngressoPedido = formatarArray(resultIngressoPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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

const listOrderedTicketByIdOrder = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultIngressoPedido = await ingressoPedido.getOrderedTicketByIdOrder(id)

            if (resultIngressoPedido) {

                if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                    resultIngressoPedido = formatarArray(resultIngressoPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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

const listOrderedTicketByIdEvent = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultIngressoPedido = await ingressoPedido.getOrderedTicketByIdEvent(id)

            if (resultIngressoPedido) {

                if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                    resultIngressoPedido = formatarArray(resultIngressoPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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

const listOrderedTicketByIdBatch = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultIngressoPedido = await ingressoPedido.getOrderedTicketByIdBatch(id)

            if (resultIngressoPedido) {

                if (resultIngressoPedido != null && resultIngressoPedido.length > 0) {
                    resultIngressoPedido = formatarArray(resultIngressoPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = resultIngressoPedido

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

const setOrderedTicket = async function (ingresso, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do pedido
            let validar = await validarIngressoPedido(ingresso)
            if (!validar) {

                let validarIDPedido = await controllerPedido.listOrdersByID(ingresso.id_pedido)
          
                if (validarIDPedido.status_code != 200) {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id pedido não foi encontrado]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS
                }

                let validarIDLoteIngresso = await controllerLoteIngresso.listTicketLotById(ingresso.id_lote_ingresso)

                if (validarIDLoteIngresso.status_code != 200) {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id lote ingresso não foi encontrado]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS
                }
                let resultIngressoPedido = await ingressoPedido.insertOrderedTicket(ingresso)

                if (resultIngressoPedido) {

                    let lastId = await ingressoPedido.getLastId()

                    if (lastId) {
                        ingresso.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = ingresso

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

const setUpdateOrderedTicket = async function (ingresso, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do IngressoPedido
            let validar = await validarIngressoPedido(ingresso)
            if (!validar) {
                let validarID = await listOrderedTicketById(id)

                if (validarID.status_code == 200) {

                    let validarIDPedido = await controllerPedido.listOrdersByID(ingresso.id_pedido)

                    
                    if (validarIDPedido.status_code != 200) {
                        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id pedido não foi encontrado]'
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }

                    let validarIDLoteIngresso = await controllerLoteIngresso.listTicketLotById(ingresso.id_lote_ingresso)
                    
                    if (validarIDLoteIngresso.status_code != 200) {
                        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id lote ingresso não foi encontrado]'
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                    ingresso.id = id
                    let resultIngressoPedido = await ingressoPedido.updateOrderedTicket(ingresso)
    
                    if (resultIngressoPedido) {
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ingresso_pedido = ingresso

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

const formatarArray = (array) => {
    array.forEach(ingressoPedido => {

        ingressoPedido.lote = []
        ingressoPedido.pedido = []
        let tipo = []
        let setor_evento = []
        let forma_pagamento = []
        let participante = []
        let evento = []
        evento.push({
            id: ingressoPedido.id_evento,
            nome: ingressoPedido.evento
        })

        delete ingressoPedido.id_evento
        delete ingressoPedido.evento

        participante.push({
            id: ingressoPedido.id_participante,
            nome: ingressoPedido.nome
        })

        delete ingressoPedido.id_participante
        delete ingressoPedido.nome

        forma_pagamento.push({
            id: ingressoPedido.id_forma_pagamento,
            metodo: ingressoPedido.forma_pagamento
        })

        delete ingressoPedido.id_forma_pagamento
        delete ingressoPedido.forma_pagamento

        ingressoPedido.pedido.push({
            id: ingressoPedido.id_pedido,
            data_pagamento: ingressoPedido.data_pagamento,
            total: ingressoPedido.total_pedido,
            forma_pagamento: forma_pagamento,
            participante: participante
        })
        delete ingressoPedido.id_pedido
        delete ingressoPedido.data_pagamento
        delete ingressoPedido.total_pedido

        setor_evento.push({
            id: ingressoPedido.id_setor,
            nome: ingressoPedido.setor
        })
        delete ingressoPedido.id_setor
        delete ingressoPedido.setor

        tipo.push({
            id: ingressoPedido.id_tipo_ingresso,
            tipo: ingressoPedido.tipo
        })

        delete ingressoPedido.id_tipo_ingresso
        delete ingressoPedido.tipo

        ingressoPedido.lote.push({
            id: ingressoPedido.id_lote_ingresso,
            valor_unitario: ingressoPedido.valor_unitario,
            tipo_ingresso: tipo,
            evento: evento,
            setor: setor_evento
        })

        delete ingressoPedido.id_lote_ingresso
        delete ingressoPedido.valor_unitario
    })
    return array
}

// Função para validar todos os dados enviados
const validarIngressoPedido = async function (ingresso) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if (ingresso.quantidade == '' || ingresso.quantidade == undefined || ingresso.quantidade == null || isNaN(ingresso.quantidade)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [total incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }
    else if (ingresso.id_pedido <= 0 || isNaN(ingresso.id_pedido) || ingresso.id_pedido == undefined || ingresso.id_pedido == null || ingresso.id_pedido == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id pedido incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (ingresso.id_lote_ingresso <= 0 || isNaN(ingresso.id_lote_ingresso) || ingresso.id_lote_ingresso == undefined || ingresso.id_lote_ingresso == null || ingresso.id_lote_ingresso == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id lote ingresso incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        false
    }

}

module.exports = {
    listOrderedTickets,
    listOrderedTicketById,
    listOrderedTicketByIdParticipant,
    listOrderedTicketByIdOrder,
    listOrderedTicketByIdEvent,
    listOrderedTicketByIdBatch,
    setOrderedTicket,
    setUpdateOrderedTicket
}
