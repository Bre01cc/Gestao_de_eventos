/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas do lote ingresso
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_lote_ingresso = require('../controller/lote_ingresso/controller_lote_ingresso.js')

//Retorna todas os lotes de ingresso
router.get('/v1/webeventos/lote-ingresso', cors(), async (request, response) => {
    let loteIngresso = await controller_lote_ingresso.listTicketLots()

    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Retorna um lote ingresso filtando pelo ID
router.get('/v1/webeventos/lote-ingresso/:id', cors(), async(request, response) => {
   
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotById(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Retorna um lote ingresso filtando pelo ID setor
router.get('/v1/webeventos/lote-ingresso/setor/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdSector(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Retorna um lote ingresso filtando pelo ID do tipo de ingresso
router.get('/v1/webeventos/lote-ingresso/tipo/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdType(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Retorna um lote ingresso filtando pelo ID do evento
router.get('/v1/webeventos/lote-ingresso/evento/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdEvent(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Cadastra um lote ingresso
router.post('/v1/webeventos/lote-ingresso', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let loteIngresso = await controller_lote_ingresso.setTicketLot(dadosBody, contentType)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

//Envia os dados do lote ingresso à controller para ser atualizada
router.put('/v1/webeventos/lote-ingresso/:id', cors(), bodyParserJSON, async(request, response) => {
    let loteIngressoID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let loteIngresso = await controller_lote_ingresso.setUpdatTicketLot(dadosBody, loteIngressoID, contentType)
    response.status(loteIngresso.status_code).json(loteIngresso)
})

module.exports = router