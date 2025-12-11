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


/**
 * @swagger
 * /v1/webeventos/participante:
 *   get:
 *     summary: Retorna todos os participantes
 *     tags: [Participantes]
 *     responses:
 *       200:
 *         description: Lista de participantes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participante'
 */                  
router.get('/v1/webeventos/participante', cors(), async (request, response) => {
    let participante = await controller_participante.listParticipants()

    response.status(participante.status_code).json(participante)
})

/**
 * @swagger
 * /v1/webeventos/participante/{id}:
 *   get:
 *     summary: Retorna um participante pelo ID
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do participante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participante'
 *       404:
 *         description: Participante não encontrado
 */
router.get('/v1/webeventos/participante/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let participanteID = request.params.id

    let participante = await controller_participante.listParticipantByID(participanteID)
    
    response.status(participante.status_code).json(participante)
})

/**
 * @swagger
 * /v1/webeventos/participante:
 *   post:
 *     summary: Cria um novo participante
 *     tags: [Participantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participante'
 *     responses:
 *       201:
 *         description: Participante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participante'
 *       400:
 *         description: Dados inválidos
 */
router.post('/v1/webeventos/participante', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let participante = await controller_participante.setParticipant(dadosBody, contentType)
    
    response.status(participante.status_code).json(participante)
})

/**
 * @swagger
 * /v1/webeventos/participante/{id}:
 *   put:
 *     summary: Atualiza os dados de um participante pelo ID
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do participante
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participante'
 *     responses:
 *       200:
 *         description: Participante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participante'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Participante não encontrado
 */
router.put('/v1/webeventos/participante/:id', cors(), bodyParserJSON, async(request, response) => {
    let participanteID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let participante = await controller_participante.setUpdateParticipant(dadosBody, participanteID, contentType)
    response.status(participante.status_code).json(participante)
})


/**
 * @swagger
 * /v1/webeventos/participante/{id}:
 *   delete:
 *     summary: Deleta um participante pelo ID
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do participante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participante deletado com sucesso
 *       404:
 *         description: Participante não encontrado
 */
router.delete('/v1/webeventos/participante/:id', cors(), async(request, response) => {
    let participanteID = request.params.id
    
    let participante = await controller_participante.setDeleteParticipant(participanteID)
    
    response.status(participante.status_code).json(participante)
})

module.exports = router

