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

/**
 * @swagger
 * /v1/webeventos/endereco-participante:
 *   get:
 *     summary: Retorna todos os endereços de participantes
 *     description: Obtém a lista completa de endereços de participantes cadastrados.
 *     tags:
 *       - Endereço Participante
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso.
 */
router.get('/v1/webeventos/endereco-participante', cors(), async (request, response) => {
    let enderecoParticipante = await controller_endereco_participante.listAdress()

    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

/**
 * @swagger
 * /v1/webeventos/endereco-participante/{id}:
 *   get:
 *     summary: Retorna um endereço de participante pelo ID
 *     description: Obtém um endereço específico de participante com base no ID informado.
 *     tags:
 *       - Endereço Participante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço do participante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso.
 *       404:
 *         description: Endereço não encontrado.
 */
router.get('/v1/webeventos/endereco-participante/:id', cors(), async (request, response) => {
    let enderecoParticipanteID = request.params.id
    let enderecoParticipante = await controller_endereco_participante.listAdressByID(enderecoParticipanteID)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

/**
 * @swagger
 * /v1/webeventos/endereco-participante/participante/{id_participante}:
 *   get:
 *     summary: Retorna os endereços de um participante específico
 *     description: Lista todos os endereços vinculados ao participante informado.
 *     tags:
 *       - Endereço Participante
 *     parameters:
 *       - in: path
 *         name: id_participante
 *         required: true
 *         description: ID do participante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereços retornados com sucesso.
 *       404:
 *         description: Nenhum endereço encontrado para este participante.
 */
router.get('/v1/webeventos/endereco-participante/participante/:id', cors(), async (request, response) => {
    let enderecoParticipanteID = request.params.id
    let enderecoParticipante = await controller_endereco_participante.listAdressByParticipantID(enderecoParticipanteID)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})


/**
 * @swagger
 * /v1/webeventos/endereco-participante:
 *   post:
 *     summary: Cria um novo endereço de participante
 *     description: Registra um novo endereço associado a um participante.
 *     tags:
 *       - Endereço Participante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnderecoParticipanteCreate'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Participante ou UF não encontrados.
 */
router.post('/v1/webeventos/endereco-participante', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let enderecoParticipante = await controller_endereco_participante.setAdress(dadosBody, contentType)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

/**
 * @swagger
 * /v1/webeventos/endereco-participante/{id}:
 *   put:
 *     summary: Atualiza um endereço de participante
 *     description: Atualiza um endereço já registrado com base no ID informado.
 *     tags:
 *       - Endereço Participante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço de participante
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnderecoParticipanteCreate'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso.
 *       404:
 *         description: Endereço não encontrado.
 */
router.put('/v1/webeventos/endereco-participante/:id', cors(), bodyParserJSON, async(request, response) => {
    let enderecoParticipanteID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let enderecoParticipante = await controller_endereco_participante.setUpdateAdress(dadosBody, enderecoParticipanteID, contentType)
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})

/**
 * @swagger
 * /v1/webeventos/endereco-participante/{id}:
 *   delete:
 *     summary: Remove um endereço de participante
 *     description: Exclui definitivamente um endereço baseado no ID fornecido.
 *     tags:
 *       - Endereço Participante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço de participante
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Endereço removido com sucesso.
 *       404:
 *         description: Endereço não encontrado.
 */
router.delete('/v1/webeventos/endereco-participante/:id', cors(), async (request, response) => {
    let enderecoParticipanteID = request.params.id
    let enderecoParticipante = await controller_endereco_participante.setDeleteAdress(enderecoParticipanteID)
    
    response.status(enderecoParticipante.status_code).json(enderecoParticipante)
})


module.exports = router