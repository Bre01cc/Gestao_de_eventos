/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Organizador 
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

const controller_organizer = require('../controller/organizador/controller_organizador.js')

//Retorna todas os organizadores
router.get('/v1/webeventos/organizador', cors(), async (request, response) => {
    let organizer = await controller_organizer.listOrganizers()

    response.status(organizer.status_code).json(organizer)
})

//Retorna um organizador filtando pelo ID
router.get('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let organizerID = request.params.id

    let organizer = await controller_organizer.listOrganizerByID(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

//Envia os dados da organizadora para a Controller
router.post('/v1/webeventos/organizador', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let organizer = await controller_organizer.setOrganizer(dadosBody, contentType)
    
    response.status(organizer.status_code).json(organizer)
})

//Envia os dados da organizadora à controller para ser atualizada
router.put('/v1/webeventos/organizador/:id', cors(), bodyParserJSON, async(request, response) => {
    let organizerID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let organizer = await controller_organizer.setUpdateOrganizer(dadosBody, organizerID, contentType)
    response.status(organizer.status_code).json(organizer)
})

//Deleta uma produtora filtando pelo ID passado pelo parâmetro
router.delete('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    let organizerID = request.params.id
    
    let organizer = await controller_organizer.setDeleteOrganizer(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

module.exports = router

