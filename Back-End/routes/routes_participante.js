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
router.get('/v1/webeventos/participante/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let participanteID = request.params.id

    let participante = await controller_participante.listParticipantByID(participanteID)
    
    response.status(participante.status_code).json(participante)
})

//Envia os dados do participante para a Controller
router.post('/v1/webeventos/participante', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let participante = await controller_participante.setParticipant(dadosBody, contentType)
    
    response.status(participante.status_code).json(participante)
})

//Envia os dados do participantes à controller para ser atualizada
router.put('/v1/webeventos/participante/:id', cors(), bodyParserJSON, async(request, response) => {
    let participanteID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let participante = await controller_participante.setUpdateParticipant(dadosBody, participanteID, contentType)
    response.status(participante.status_code).json(participante)
})

//Deleta um participante pelo ID passado pelo parâmetro
router.delete('/v1/webeventos/participante/:id', cors(), async(request, response) => {
    let participanteID = request.params.id
    
    let participante = await controller_participante.setDeleteParticipant(participanteID)
    
    response.status(participante.status_code).json(participante)
})

module.exports = router

