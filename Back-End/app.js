

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
const routes_forma_pagamento = require('./routes/routes_forma_pagamento.js')
const routes_participante = require('./routes/routes_participante.js')
const routes_endereco_participante = require('./routes/routes_endereco_participante.js')
const routes_tipo_ingresso = require('./routes/routes_tipo_ingresso.js')
const routes_pedido = require('./routes/routes_pedido.js')
const routes_ingressos_pedido = require('./routes/routes_ingressos_pedido.js')
const routes_lote_ingresso = require('./routes/routes_lote_ingresso.js')

app.use(routes_category)
app.use(routes_uf)
app.use(routes_stats_event)
app.use(routes_organizer)
app.use(routes_forma_pagamento)
app.use(routes_participante)
app.use(routes_endereco_participante)
app.use(routes_tipo_ingresso)
app.use(routes_pedido)
app.use(routes_ingressos_pedido)
app.use(routes_lote_ingresso)

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})