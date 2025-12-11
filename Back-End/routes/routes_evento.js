/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Evento 
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

const controller_event = require('../controller/evento/controller_evento.js')

/**
 * @swagger
 * /v1/webeventos/evento:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Retorna a lista de eventos cadastrados
 *     description: Retorna todos os eventos com seus dados completos
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/v1/webeventos/evento', cors(), async (request, response) => {
    let event = await controller_event.listEvents()

    response.status(event.status_code).json(event)
})

/**
 * @swagger
 * /v1/webeventos/evento/{id}:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Retorna um evento específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 */
router.get('/v1/webeventos/evento/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let eventID = request.params.id

    let event = await controller_event.listEventByID(eventID)
    
    response.status(event.status_code).json(event)
})

/**
 * @swagger
 * /v1/webeventos/evento:
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Cria um novo evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoCreate'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */
router.post('/v1/webeventos/evento', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let event = await controller_event.setEvent(dadosBody, contentType)
    
    response.status(event.status_code).json(event)
})

/**
 * @swagger
 * /v1/webeventos/evento/{id}:
 *   put:
 *     tags:
 *       - Eventos
 *     summary: Atualiza os dados de um evento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento que será atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoCreate'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       404:
 *         description: Evento não encontrado
 */
router.put('/v1/webeventos/evento/:id', cors(), bodyParserJSON, async(request, response) => {
    let eventID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let event = await controller_event.setUpdateEvent(dadosBody, eventID, contentType)
    response.status(event.status_code).json(event)
})

/**
 * @swagger
 * /v1/webeventos/evento/{id}:
 *   delete:
 *     tags:
 *       - Eventos
 *     summary: Remove um evento pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento removido com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/v1/webeventos/evento/:id', cors(), async(request, response) => {
    let eventID = request.params.id
    
    let event = await controller_event.setDeleteEvent(eventID)
    
    response.status(event.status_code).json(event)
})

module.exports = router