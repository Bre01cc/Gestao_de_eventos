/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas do setor
 * Data: 09/12/2025
 * Autor: Weslei
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_setor = require('../controller/setor/controller_setor')

//Retorna todas os setores
router.get('/v1/webeventos/setor', cors(), async (request, response) => {
    let setor = await controller_setor.listSetores()

    response.status(setor.status_code).json(setor)
})

//Retorna um setor filtrado pelo ID
router.get('/v1/webeventos/setor/:id', cors(), async(request, response) => {
    
    let setorID = request.params.id

    let setor = await controller_setor.listSetorByID(setorID)
    
    response.status(setor.status_code).json(setor)
})

//Retorna um setor filtrado pelo ID do evento
router.get('/v1/webeventos/setor/evento/:id', cors(), async(request, response) => {
    
    let setorID = request.params.id

    let setor = await controller_setor.listSetorByIDEvent(setorID)
    
    response.status(setor.status_code).json(setor)
})

//Envia os dados do setor para a Controller
router.post('/v1/webeventos/setor', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let setor = await controller_setor.setSetor(dadosBody, contentType)
    
    response.status(setor.status_code).json(setor)
})

//Envia os dados do setors à controller para ser atualizada
router.put('/v1/webeventos/setor/:id', cors(), bodyParserJSON, async(request, response) => {
    let setorID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let setor = await controller_setor.setUpdateSetor(dadosBody, setorID, contentType)
    response.status(setor.status_code).json(setor)
})


module.exports = router

