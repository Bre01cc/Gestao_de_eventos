'use strict'

const evento = JSON.parse(sessionStorage.getItem('evento'))
console.log(evento)

import { lerSetorIDEvento, lerLotesIDSetor} from "./fetchs.js"
const listaSetores = await lerSetorIDEvento(evento.id)
const setores = listaSetores.items.setor
console.log(setores)

const listaLotes = await lerLotesIDSetor(setores[0].id)
const lotes = listaLotes.items.lote_ingresso
console.log(lotes)


function criarTela(evento){
    const banner = document.querySelector('.banner')
    const media = document.createElement('div')
    media.className = "media"

    const capaEvento = document.createElement("img")
    capaEvento.src = evento.capa_url

    const nomeEvento = document.createElement('span')
    nomeEvento.textContent = evento.nome

    banner.append(media, nomeEvento)
    media.appendChild(capaEvento)

    const containerCategorias = document.querySelector('.container-categoria')
    const categoriaP = document.createElement('p')
    categoriaP.className = "categoria"

    criarSetor(setores)
    criarLotes(lotes)

    evento.categorias.forEach((categoria) => {
        containerCategorias.appendChild(categoriaP)
        categoriaP.textContent = categoria.categoria_nome

    })

    const containerDescricao = document.querySelector('.descricao')
    const descricao = document.createElement('p')
    descricao.textContent = evento.descricao

    containerDescricao.appendChild(descricao)

    const logradouro = document.getElementById('logradouro')
    logradouro.textContent = evento.logradouro

    const numero = document.getElementById('numero')
    numero.textContent = evento.numero

    const bairro = document.getElementById('bairro')
    bairro.textContent = evento.bairro

    const cidade = document.getElementById('cidade')
    cidade.textContent = evento.cidade

    const cep = document.getElementById('cep')
    cep.textContent = evento.cep

}

criarTela(evento)



function criarSetor(setores){

   
    const containerSetores = document.querySelector('.setores')
    
    setores.forEach((setor) => {
        const divSetor = document.createElement('div')
        divSetor.className = "setor"

        const nomeSetor = document.createElement('h3')
        nomeSetor.textContent = setor.nome
    
        divSetor.appendChild(nomeSetor)
        containerSetores.appendChild(divSetor)

        

    })
}

function criarLotes(lotes){

    const divSetor = document.querySelector('.setor')

    const data = evento.data
    const dataSeparada = data.split('-')

    const diaData = dataSeparada[2]
    const dia = diaData.slice(0, 2)

    const mesFormatado = mesPorNumero(dataSeparada[1])

    lotes.forEach((lote) => {
        const divLote = document.createElement('div')
        divLote.className = "lote"
        const divData = document.createElement('div')
        divData.className = "data"

        const mes = mesFormatado.slice(0, 3)

        const ano = dataSeparada[0]
        
        const diaP = document.createElement('p')
        diaP.innerHTML = `${dia}<br>${mes}<br>${ano}`

        divSetor.appendChild(divLote)
        divLote.append(divData)
        divData.append(diaP)

        const divIngresso = document.createElement('div')
        divIngresso.className = 'ingresso'

        const divTexto = document.createElement('div')
        divTexto.className = 'texto'

        const nomeIngresso = document.createElement('p')
        nomeIngresso.textContent = lote.tipo_ingresso[0].nome

        const preco = document.createElement('p')
        preco.textContent = lote.valor

        const buttonComprar = document.createElement('button')
        buttonComprar.className = "comprar"
        buttonComprar.textContent = "Comprar"

        divLote.appendChild(divIngresso)
        divIngresso.append(divTexto, buttonComprar)
        divTexto.append(nomeIngresso, preco)
    })
}

function mesPorNumero(numeroMes) {
    const data = new Date(2024, numeroMes - 1, 1)
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(data)
}
  
  