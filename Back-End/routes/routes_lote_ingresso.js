/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas do lote ingresso
 * Data: 07/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_lote_ingresso = require('../controller/lote_ingresso/controller_lote_ingresso.js')

/**
 * @swagger
 * /v1/webeventos/lote-ingresso:
 *   get:
 *     tags:
 *       - Lote Ingresso
 *     summary: Lista todos os lotes de ingresso
 *     description: Retorna todos os lotes de ingresso cadastrados com informações de tipo de ingresso, setor e evento.
 *     responses:
 *       200:
 *         description: Lista de lotes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoteIngresso'
 */
router.get('/v1/webeventos/lote-ingresso', cors(), async (request, response) => {
    let loteIngresso = await controller_lote_ingresso.listTicketLots()

    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso/{id}:
 *   get:
 *     tags:
 *       - Lote Ingresso
 *     summary: Retorna um lote específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do lote de ingresso
 *     responses:
 *       200:
 *         description: Lote encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoteIngresso'
 *       404:
 *         description: Lote não encontrado
 */
router.get('/v1/webeventos/lote-ingresso/:id', cors(), async(request, response) => {
   
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotById(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso/setor/{id_setor}:
 *   get:
 *     tags:
 *       - Lote Ingresso
 *     summary: Lista todos os lotes de ingresso associados a um setor específico
 *     parameters:
 *       - in: path
 *         name: id_setor
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do setor
 *     responses:
 *       200:
 *         description: Lotes encontrados com sucesso para o setor informado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoteIngresso'
 *       404:
 *         description: Nenhum lote encontrado para o setor informado
 */
router.get('/v1/webeventos/lote-ingresso/setor/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdSector(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso/tipo/{id_tipo}:
 *   get:
 *     tags:
 *       - Lote Ingresso
 *     summary: Lista todos os lotes de ingresso associados a um tipo de ingresso específico
 *     parameters:
 *       - in: path
 *         name: id_tipo
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do tipo de ingresso
 *     responses:
 *       200:
 *         description: Lotes encontrados com sucesso para o tipo de ingresso informado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoteIngresso'
 *       404:
 *         description: Nenhum lote encontrado para o tipo de ingresso informado
 */
router.get('/v1/webeventos/lote-ingresso/tipo/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdType(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso/evento/{id_evento}:
 *   get:
 *     tags:
 *       - Lote Ingresso
 *     summary: Lista todos os lotes de ingresso associados a um evento específico
 *     parameters:
 *       - in: path
 *         name: id_evento
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Lotes encontrados com sucesso para o evento informado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoteIngresso'
 *       404:
 *         description: Nenhum lote encontrado para o evento informado
 */
router.get('/v1/webeventos/lote-ingresso/evento/:id', cors(), async(request, response) => {
    
    let loteIngressoID = request.params.id

    let loteIngresso = await controller_lote_ingresso.listTicketLotByIdEvent(loteIngressoID)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso:
 *   post:
 *     tags:
 *       - Lote Ingresso
 *     summary: Cria um novo lote de ingresso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoteIngressoCreate'
 *     responses:
 *       201:
 *         description: Lote criado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */
router.post('/v1/webeventos/lote-ingresso', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let loteIngresso = await controller_lote_ingresso.setTicketLot(dadosBody, contentType)
    
    response.status(loteIngresso.status_code).json(loteIngresso)
})

/**
 * @swagger
 * /v1/webeventos/lote-ingresso/{id}:
 *   put:
 *     tags:
 *       - Lote Ingresso
 *     summary: Atualiza um lote de ingresso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do lote de ingresso a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoteIngressoCreate'
 *     responses:
 *       200:
 *         description: Lote atualizado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       404:
 *         description: Lote não encontrado
 */
router.put('/v1/webeventos/lote-ingresso/:id', cors(), bodyParserJSON, async(request, response) => {
    let loteIngressoID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let loteIngresso = await controller_lote_ingresso.setUpdatTicketLot(dadosBody, loteIngressoID, contentType)
    response.status(loteIngresso.status_code).json(loteIngresso)
})

module.exports = router