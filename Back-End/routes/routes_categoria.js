/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Categorias dos Eventos da API 
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

const controller_category = require('../controller/categoria/controller_categoria.js')

//Retorna todas as categorias
router.get('/v1/webeventos/categoria', cors(), async (request, response) => {
    let category = await controller_category.listCategorys()

    response.status(category.status_code).json(category)
})

//Retorna todas as categorias
router.get('/v1/webeventos/categoria/:id', cors(), async (request, response) => {
    let categoryID = request.params.id
    let category = await controller_category.listCategoryByID(categoryID)
    
    response.status(category.status_code).json(category)
})

module.exports = router