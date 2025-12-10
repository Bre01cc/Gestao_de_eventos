/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Ingressos pedidos
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_ingressos_pedido = require('../controller/participante/controller_ingressos_pedido.js')

//Retorna todas os ingressos pedidos
router.get('/v1/webeventos/ingressos-pedido', cors(), async (request, response) => {
    let ingressopedido = await controller_ingressos_pedido.listOrderedTickets()

    response.status(ingressopedido.status_code).json(ingressopedido)
})

//Retorna um ingresso pedido pelo id
router.get('/v1/webeventos/ingressos-pedido/:id', cors(), async (request, response) => {
    let ingressoPedidoID = request.params.id
    let ingressoPedido = await controller_ingressos_pedido.listOrderedTicketById(ingressoPedidoID)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Retorna um ingressso pedido pelo id do participante
router.get('/v1/webeventos/ingressos-pedido/participante/:id', cors(), async (request, response) => {
    let ingressoPedidoID = request.params.id
    let ingressoPedido = await controller_ingressos_pedido.listOrderedTicketByIdParticipant(ingressoPedidoID)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Retorna um ingressso pedido pelo id do lote
router.get('/v1/webeventos/ingressos-pedido/lote/:id', cors(), async (request, response) => {
    let ingressoPedidoID = request.params.id
    let ingressoPedido = await controller_ingressos_pedido.listOrderedTicketByIdBatch(ingressoPedidoID)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Retorna um ingressso pedido pelo id do evento
router.get('/v1/webeventos/ingressos-pedido/evento/:id', cors(), async (request, response) => {
    let ingressoPedidoID = request.params.id
    let ingressoPedido = await controller_ingressos_pedido.listOrderedTicketByIdEvent(ingressoPedidoID)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Retorna um ingressso pedido pelo id do pedido
router.get('/v1/webeventos/ingressos-pedido/pedido/:id', cors(), async (request, response) => {
    let ingressoPedidoID = request.params.id
    let ingressoPedido = await controller_ingressos_pedido.listOrderedTicketByIdOrder(ingressoPedidoID)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Cadastra um ingresso pedido
router.post('/v1/webeventos/ingressos-pedido', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ingressoPedido = await controller_ingressos_pedido.setOrderedTicket(dadosBody, contentType)

    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

//Envia os dados do ingresso pedido à controller para ser atualizada
router.put('/v1/webeventos/ingressos-pedido/:id', cors(), bodyParserJSON, async (request, response) => {
    let ingressoPedidoID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let ingressoPedido = await controller_ingressos_pedido.setUpdateOrderedTicket(dadosBody, ingressoPedidoID, contentType)
    response.status(ingressoPedido.status_code).json(ingressoPedido)
})

module.exports = router