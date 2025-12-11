/***********************************************************************************************************
 * Objetivo: Arquivo responsável por controlar as requisições da API de Gestão de Eventos 
 * Data: 26/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const PORT = process.env.PORT || 8080;

const app = express();

// Habilita CORS para todas as rotas e origens
app.use(cors());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import das rotas
const routes_category = require('./routes/routes_categoria.js') 
const routes_uf = require('./routes/routes_uf.js')
const routes_stats_event = require('./routes/routes_status_evento.js')
const routes_organizer = require('./routes/routes_organizador.js')
const routes_event = require('./routes/routes_evento.js')
const routes_forma_pagamento = require('./routes/routes_forma_pagamento.js')
const routes_participante = require('./routes/routes_participante.js')
const routes_endereco_participante = require('./routes/routes_endereco_participante.js')
const routes_tipo_ingresso = require('./routes/routes_tipo_ingresso.js')
const routes_pedido = require('./routes/routes_pedido.js')
const routes_ingressos_pedido = require('./routes/routes_ingressos_pedido.js')
const routes_lote_ingresso = require('./routes/routes_lote_ingresso.js')
const routes_setor = require('./routes/routes_setor.js')

// Usando as rotas
app.use(routes_category)
app.use(routes_uf)
app.use(routes_stats_event)
app.use(routes_organizer)
app.use(routes_event)
app.use(routes_participante)
app.use(routes_endereco_participante)
app.use(routes_tipo_ingresso)
app.use(routes_pedido)
app.use(routes_ingressos_pedido)
app.use(routes_lote_ingresso)
app.use(routes_setor)
app.use(routes_forma_pagamento)

app.listen(PORT, () => {
    console.log('API aguardando requisições na porta ' + PORT)
});