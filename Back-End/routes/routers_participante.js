/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas do Participante 
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_participante = require('../controller/participante/controller_participante.js')

//Retorna todas os participantes
router.get('/v1/webeventos/participante', cors(), async (request, response) => {
    let participante = await controller_participante.listParticipants()

    response.status(participante.status_code).json(participante)
})

//Retorna um organizador filtando pelo ID
router.get('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let organizerID = request.params.id

    let organizer = await controller_participante.listOrganizerByID(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

//Envia os dados da organizadora para a Controller
router.post('/v1/webeventos/organizador', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let organizer = await controller_participante.setOrganizer(dadosBody, contentType)
    
    response.status(organizer.status_code).json(organizer)
})

//Envia os dados da organizadora à controller para ser atualizada
router.put('/v1/webeventos/organizador/:id', cors(), bodyParserJSON, async(request, response) => {
    let organizerID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let organizer = await controller_participante.setUpdateOrganizer(dadosBody, organizerID, contentType)
    response.status(organizer.status_code).json(organizer)
})

//Deleta uma produtora filtando pelo ID passado pelo parâmetro
router.delete('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    let organizerID = request.params.id
    
    let organizer = await controller_participante.setDeleteOrganizer(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

module.exports = router

