/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Endereço do pedido 
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

const controller_pedido = require('../controller/participante/controller_pedido.js')

//Retorna todas os pedidos
router.get('/v1/webeventos/pedido', cors(), async (request, response) => {
    let pedido = await controller_pedido.listOrders()

    response.status(pedido.status_code).json(pedido)
})

//Retorna um pedido pelo id
router.get('/v1/webeventos/pedido/:id', cors(), async (request, response) => {
    let pedidoID = request.params.id
    let pedido = await controller_pedido.listOrdersByID(pedidoID)

    response.status(pedido.status_code).json(pedido)
})

//Retorna um pedido pelo id do participante
router.get('/v1/webeventos/pedido/participante/:id', cors(), async (request, response) => {
    let pedidoID = request.params.id
    let pedido = await controller_pedido.listOrdersByIDParticipant(pedidoID)

    response.status(pedido.status_code).json(pedido)
})

//Retorna um pedido pelo id da forma de pagamento
router.get('/v1/webeventos/pedido/forma-pagamento/:id', cors(), async (request, response) => {
    let pedidoID = request.params.id
    let pedido = await controller_pedido.listOrdersByIDPayment(pedidoID)

    response.status(pedido.status_code).json(pedido)
})

//Cadastra um pedido
router.post('/v1/webeventos/pedido', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let pedido = await controller_pedido.setOrder(dadosBody, contentType)
    
    response.status(pedido.status_code).json(pedido)
})

//Envia os dados do pedido à controller para ser atualizada
router.put('/v1/webeventos/pedido/:id', cors(), bodyParserJSON, async(request, response) => {
    let pedidoID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let pedido = await controller_pedido.setUpdateOrder(dadosBody, pedidoID, contentType)
    response.status(pedido.status_code).json(pedido)
})

module.exports = router