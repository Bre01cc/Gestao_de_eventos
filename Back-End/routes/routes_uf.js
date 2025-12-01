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

const controller_uf = require('../controller/uf/controller_uf.js')

//Retorna todas as categorias
router.get('/v1/webeventos/uf', cors(), async (request, response) => {
    let uf = await controller_uf.listUfs()

    response.status(uf.status_code).json(uf)
})

//Retorna todas as categorias
router.get('/v1/webeventos/uf/:id', cors(), async (request, response) => {
    let ufID = request.params.id
    let uf = await controller_uf.listCategoryByID(ufID)
    
    response.status(uf.status_code).json(uf)
})

module.exports = router