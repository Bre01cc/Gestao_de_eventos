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

//Retorna todos os tipo ingresso
router.get('/v1/webeventos/tipo-ingresso', cors(), async (request, response) => {
    let tipoIngresso = await controller_tipo_ingresso.listAllTicket()

    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

//Retorna todos os tipo ingresso
router.get('/v1/webeventos/tipo-ingresso/:id', cors(), async (request, response) => {
    let tipoIngressoID = request.params.id
    let tipoIngresso = await controller_tipo_ingresso.listTicketByID(tipoIngressoID)
    
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

//Cadastra um tipo ingresso
router.post('/v1/webeventos/tipo-ingresso', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let tipoIngresso = await controller_tipo_ingresso.setTicket(dadosBody, contentType)
    
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

//Envia os dados do tipo Ingressos à controller para ser atualizada
router.put('/v1/webeventos/tipo-ingresso/:id', cors(), bodyParserJSON, async(request, response) => {
    let tipoIngressoID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let tipoIngresso = await controller_tipo_ingresso.setUpdateTicket(dadosBody, tipoIngressoID, contentType)
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})

//Deleta um tipo ingresso
router.delete('/v1/webeventos/tipo-ingresso/:id', cors(), async (request, response) => {
    let tipoIngressoID = request.params.id
    let tipoIngresso = await controller_tipo_ingresso.setDeleteTicket(tipoIngressoID)
    
    response.status(tipoIngresso.status_code).json(tipoIngresso)
})



module.exports = router;