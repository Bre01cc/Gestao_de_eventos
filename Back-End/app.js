/***********************************************************************************************************
 * Objetivo: Arquivo responsável por controlar as requisições da API de Gestão de Eventos 
 * Data: 26/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependências
const express =    require('express')
const cors =       require('cors') 

//Retorna a porta do sevidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//Criando uma instância de uma classe do express
const app = express()

//Configuraçõs do cors
app.use((request, response, next)=>{
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    app.use(cors())
    next() 
})


//Import das rotas
const routes_category = require('./routes/routes_categoria.js') 
const routes_uf = require('./routes/routes_uf.js')
const routes_stats_event = require('./routes/routes_status_evento.js')
const routes_organizer = require('./routes/routes_organizador.js')

app.use(routes_category)
app.use(routes_uf)
app.use(routes_stats_event)
app.use(routes_organizer)


app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})