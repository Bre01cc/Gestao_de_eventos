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

/**
 * @swagger
 * /v1/webeventos/setor:
 *   get:
 *     summary: Retorna todos os setores
 *     description: Obtém a lista completa de setores cadastrados.
 *     tags:
 *       - Setores
 *     responses:
 *       200:
 *         description: Lista de setores retornada com sucesso.
 */
router.get('/v1/webeventos/setor', cors(), async (request, response) => {
    let setor = await controller_setor.listSetores()

    response.status(setor.status_code).json(setor)
})
/**
 * @swagger
 * /v1/webeventos/setor/{id}:
 *   get:
 *     summary: Retorna um setor pelo ID
 *     description: Busca um setor específico usando seu ID.
 *     tags:
 *       - Setores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do setor
 *     responses:
 *       200:
 *         description: Setor encontrado.
 *       404:
 *         description: Setor não encontrado.
 */
router.get('/v1/webeventos/setor/:id', cors(), async(request, response) => {
    
    let setorID = request.params.id

    let setor = await controller_setor.listSetorByID(setorID)
    
    response.status(setor.status_code).json(setor)
})

/**
 * @swagger
 * /v1/webeventos/setor/evento/{id_evento}:
 *   get:
 *     summary: Retorna setores vinculados a um evento
 *     description: Lista todos os setores pertencentes ao evento informado.
 *     tags:
 *       - Setores
 *     parameters:
 *       - name: id_evento
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Lista de setores do evento retornada com sucesso.
 *       404:
 *         description: Nenhum setor encontrado para o evento informado.
 */
router.get('/v1/webeventos/setor/evento/:id', cors(), async(request, response) => {
    
    let setorID = request.params.id

    let setor = await controller_setor.listSetorByIDEvent(setorID)
    
    response.status(setor.status_code).json(setor)
})

/**
 * @swagger
 * /v1/webeventos/setor:
 *   post:
 *     summary: Cria um novo setor
 *     description: Cria um setor com base no corpo da requisição.
 *     tags:
 *       - Setores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetorCreate'
 *     responses:
 *       201:
 *         description: Setor criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/v1/webeventos/setor', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let setor = await controller_setor.setSetor(dadosBody, contentType)
    
    response.status(setor.status_code).json(setor)
})


/**
 * @swagger
 * /v1/webeventos/setor/{id}:
 *   put:
 *     summary: Atualiza um setor existente
 *     description: Atualiza os dados de um setor baseado no ID informado.
 *     tags:
 *       - Setores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do setor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetorCreate'
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Setor não encontrado.
 */
router.put('/v1/webeventos/setor/:id', cors(), bodyParserJSON, async(request, response) => {
    let setorID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let setor = await controller_setor.setUpdateSetor(dadosBody, setorID, contentType)
    response.status(setor.status_code).json(setor)
})


module.exports = router

