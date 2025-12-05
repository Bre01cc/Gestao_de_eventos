/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Endereço do participante 
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

const controller_endereco_participante = require('../controller/participante/controller_endereco_participante.js')

//Retorna todas as categorias
router.get('/v1/webeventos/endereco-participante', cors(), async (request, response) => {
    let enderecoParticipante = await controller_endereco_participante.listAdress()

    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

//Retorna todas as categorias
router.get('/v1/webeventos/endereco_participante/:id', cors(), async (request, response) => {
    let enderecoParticipanteID = request.params.id
    let enderecoParticipante = await controller_endereco_participante.listAdressByParticipantID(enderecoParticipanteID)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

//Retorna todas as categorias
router.get('/v1/webeventos/endereco-participante/:id', cors(), async (request, response) => {
    let enderecoParticipanteID = request.params.id
    let enderecoParticipante = await controller_endereco_participante.listAdressByID(enderecoParticipanteID)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

module.exports = router