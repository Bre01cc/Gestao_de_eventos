/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Evento 
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_event = require('../controller/evento/controller_evento.js')

//Retorna todas os organizadores
router.get('/v1/webeventos/evento', cors(), async (request, response) => {
    let event = await controller_event.listEvents()

    response.status(event.status_code).json(event)
})

//Retorna um organizador filtando pelo ID
router.get('/v1/webeventos/evento/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let eventID = request.params.id

    let event = await controller_event.listEventByID(eventID)
    
    response.status(event.status_code).json(event)
})

//Envia os dados da organizadora para a Controller
router.post('/v1/webeventos/evento', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let event = await controller_event.setEvent(dadosBody, contentType)
    
    response.status(event.status_code).json(event)
})

//Envia os dados da organizadora à controller para ser atualizada
router.put('/v1/webeventos/evento/:id', cors(), bodyParserJSON, async(request, response) => {
    let eventID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let event = await controller_event.setUpdateEvent(dadosBody, eventID, contentType)
    response.status(event.status_code).json(event)
})

//Deleta uma produtora filtando pelo ID passado pelo parâmetro
router.delete('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    let eventID = request.params.id
    
    let event = await controller_event.setDeleteEvent(eventID)
    
    response.status(event.status_code).json(event)
})

module.exports = router