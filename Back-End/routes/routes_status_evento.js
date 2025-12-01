/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de UF 
 * Data: 27/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_event_stats = require('../controller/status_evento/controller_status_evento.js')

//Retorna todas as categorias
router.get('/v1/webeventos/uf', cors(), async (request, response) => {
    let stats = await controller_event_stats.listStats()

    response.status(stats.status_code).json(stats)
})

//Retorna todas as categorias
router.get('/v1/webeventos/uf/:id', cors(), async (request, response) => {
    let statsID = request.params.id
    let stats = await controller_event_stats.listStatsByID(statsID)
    
    response.status(stats.status_code).json(stats)
})

module.exports = router