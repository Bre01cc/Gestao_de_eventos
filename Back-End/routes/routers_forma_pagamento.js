/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de formas de pagamento 
 * Data: 04/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_forma_pagamento = require('../controller/forma_pagamento/controller_forma_pagamento.js')

//Retorna todas as categorias
router.get('/v1/webeventos/pagamento', cors(), async (request, response) => {
    let pagamento = await controller_forma_pagamento.listPayments()

    response.status(pagamento.status_code).json(pagamento)
})

//Retorna todas as categorias
router.get('/v1/webeventos/pagamento/:id', cors(), async (request, response) => {
    let pagamentoID = request.params.id
    let pagamento = await controller_forma_pagamento.listPaymentsByID(pagamentoID)
    
    response.status(pagamento.status_code).json(pagamento)
})

module.exports = router