/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente ao pedido
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/
const pedidoDAO = require('../../model/dao/pedido.js')
const controllerParticipante = require('./controller_participante.js')
const controllerFormaPagamento = require('../forma_pagamento/controller_forma_pagamento.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listOrders = async function () {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPedido = await pedidoDAO.getAllOrder()

        if (resultPedido) {
            if (resultPedido != null && resultPedido.length > 0) {
                resultPedido = formatarArray(resultPedido)
                MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.pedidos = resultPedido

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

const listOrdersByID = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultPedido = await pedidoDAO.getOrderById(id)

            if (resultPedido) {

                if (resultPedido != null && resultPedido.length > 0) {
                    resultPedido = formatarArray(resultPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pedido = resultPedido

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

const listOrdersByIDParticipant = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultPedido = await pedidoDAO.getOrderByIdParticipant(id)

            if (resultPedido) {

                if (resultPedido != null && resultPedido.length > 0) {
                    resultPedido = formatarArray(resultPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pedido = resultPedido

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

const listOrdersByIDPayment = async function (id) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if (!isNaN(id) && id != '' && id > 0) {
            let resultPedido = await pedidoDAO.getOrderByIdPayment(id)

            if (resultPedido) {

                if (resultPedido != null && resultPedido.length > 0) {
                    resultPedido = formatarArray(resultPedido)
                    MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pedido = resultPedido

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

const setOrder = async function (pedido, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do pedido
            let validar = await validarPedido(pedido)
            if (!validar) {

                let validarIDParticipante = await controllerParticipante.listParticipantByID(pedido.id_participante)
         
                if (validarIDParticipante.status_code != 200) {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id participante não foi encontrado]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS
                }

                let validarIDFormaPagamento = await controllerFormaPagamento.listPaymentsByID(pedido.id_forma_pagamento)

                if (validarIDFormaPagamento.status_code != 200) {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id forma de pagamento não foi encontrado]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS
                }
                let resultPedido = await pedidoDAO.insertOrder(pedido)

                if (resultPedido) {

                    let lastId = await pedidoDAO.getLastId()

                    if (lastId) {
                        pedido.id = lastId
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.pedido = pedido

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

const setUpdateOrder = async function (pedido, id, contentType) {
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Guarda o resultado da validação de dados do pedido
            let validar = await validarPedido(pedido)
            if (!validar) {
                let validarID = await listOrdersByID(id)

                if (validarID.status_code == 200) {

                    let validarIDParticipante = await controllerParticipante.listParticipantByID(pedido.id_participante)
                   
                    if (validarIDParticipante.status_code != 200) {
                        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id participante não foi encontrado]'
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }

                    let validarIDFormaPagamento = await controllerFormaPagamento.listPaymentsByID(pedido.id_forma_pagamento)

                    if (validarIDFormaPagamento.status_code != 200) {
                        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id forma de pagamento não foi encontrado]'
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                    pedido.id = id
                    let resultPedido = await pedidoDAO.updateOrder(pedido)
                    if (resultPedido) {
                        MESSAGES.DEFAULT_HEADER.development = "Breno Oliveira Assis Reis"
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.pedido = pedido

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
    array.forEach(pedido => {
        pedido.participante = []
        pedido.participante.push({
            id: pedido.id_participante,
            nome: pedido.nome
        })

        delete pedido.id_participante
        delete pedido.nome

        pedido.forma_pagamento = []
        pedido.forma_pagamento.push({
            id: pedido.id_forma_pagamento,
            metodo_pagamento: pedido.pagamento
        })

        delete pedido.id_forma_pagamento
        delete pedido.pagamento
    })
    return array
}

// Função para validar todos os dados do participante enviado
const validarPedido = async function (pedido) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if (pedido.total == '' || pedido.total == undefined || pedido.total == null || isNaN(pedido.total)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [total incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    } else if (pedido.data_pagamento == '' || pedido.data_pagamento == undefined || pedido.data_pagamento == null || pedido.data_pagamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [data pagamento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if (pedido.id_participante <= 0 || isNaN(pedido.id_participante) || pedido.id_participante == undefined || pedido.id_participante == null || pedido.id_participante == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id participante incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (pedido.id_forma_pagamento <= 0 || isNaN(pedido.id_forma_pagamento) || pedido.id_forma_pagamento == undefined || pedido.id_forma_pagamento == null || pedido.id_forma_pagamento == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id forma de pagamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        false
    }

}


module.exports = {
    listOrders,
    listOrdersByID,
    listOrdersByIDParticipant,
    listOrdersByIDPayment,
    setOrder,
    setUpdateOrder
}