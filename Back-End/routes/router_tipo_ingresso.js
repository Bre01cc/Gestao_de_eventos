/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de tipo de ingresso
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

const controller_tipo_ingresso = require('../controller/tipo_ingresso/controller_tipo_ingresso.js')

//Retorna todas as categorias
router.get('/v1/webeventos/tipo-ingresso', cors(), async (request, response) => {
    let tipoIngresso = await controller_tipo_ingresso.listAllTicket()

    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

//Retorna todas as categorias
router.get('/v1/webeventos/tipo-ingresso/:id', cors(), async (request, response) => {
    let tipoIngressoID = request.params.id
    let tipoIngresso = await controller_tipo_ingresso.listTicketByID(tipoIngressoID)
    
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

router.delete('/v1/webeventos/tipo-ingresso/:id', cors(), async (request, response) => {
    let tipoIngressoID = request.params.id
    let tipoIngresso = await controller_tipo_ingresso.setDeleteTicket(tipoIngressoID)
    
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})



module.exports = router;