/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Organizador 
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

const controller_organizer = require('../controller/organizador/controller_organizador.js')

/**
 * @swagger
 * /v1/webeventos/organizador:
 *   get:
 *     summary: Retorna todos os organizadores
 *     tags: [Organizadores]
 *     responses:
 *       200:
 *         description: Lista de organizadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organizador'
*/
router.get('/v1/webeventos/organizador', cors(), async (request, response) => {
    let organizer = await controller_organizer.listOrganizers()

    response.status(organizer.status_code).json(organizer)
})

/**
 * @swagger
 * /v1/webeventos/organizador/{id}:
 *   get:
 *     summary: Retorna um organizador pelo ID
 *     tags: [Organizadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do organizador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organizador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizador'
 *       404:
 *         description: Organizador não encontrado
 */
router.get('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let organizerID = request.params.id

    let organizer = await controller_organizer.listOrganizerByID(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

/**
 * @swagger
 * /v1/webeventos/organizador:
 *   post:
 *     summary: Cria um novo organizador
 *     tags: [Organizadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_fantasia:
 *                 type: string
 *                 example: "Music Live"
 *               razao_social:
 *                 type: string
 *                 example: "Music Live Produções LTDA"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contato@musiclive.com"
 *               cnpj:
 *                 type: string
 *                 example: "20394857000155"
 *               telefone:
 *                 type: string
 *                 example: "11999887766"
 *               senha:
 *                 type: string
 *                 example: "1234"
 *               endereco:
 *                 $ref: '#/components/schemas/EnderecoOrganizador'
 *     responses:
 *       201:
 *         description: Organizador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizador'
 *       400:
 *         description: Dados inválidos
 */
router.post('/v1/webeventos/organizador', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let organizer = await controller_organizer.setOrganizer(dadosBody, contentType)
    
    response.status(organizer.status_code).json(organizer)
})

/**
 * @swagger
 * /v1/webeventos/organizador/{id}:
 *   put:
 *     summary: Atualiza os dados de um organizador pelo ID
 *     tags: [Organizadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do organizador
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organizador'
 *     responses:
 *       200:
 *         description: Organizador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizador'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Organizador não encontrado
 */
router.put('/v1/webeventos/organizador/:id', cors(), bodyParserJSON, async(request, response) => {
    let organizerID = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let organizer = await controller_organizer.setUpdateOrganizer(dadosBody, organizerID, contentType)
    response.status(organizer.status_code).json(organizer)
})

/**
 * @swagger
 * /v1/webeventos/organizador/{id}:
 *   delete:
 *     summary: Deleta um organizador pelo ID
 *     tags: [Organizadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do organizador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organizador deletado com sucesso
 *       404:
 *         description: Organizador não encontrado
 */
router.delete('/v1/webeventos/organizador/:id', cors(), async(request, response) => {
    let organizerID = request.params.id
    
    let organizer = await controller_organizer.setDeleteOrganizer(organizerID)
    
    response.status(organizer.status_code).json(organizer)
})

module.exports = router

