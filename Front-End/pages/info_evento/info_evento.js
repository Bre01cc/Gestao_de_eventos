'use strict'

const evento = JSON.parse(sessionStorage.getItem('evento'))
console.log(evento)

import { lerSetorIDEvento } from "./fetchs.js"
const listaSetores = await lerSetorIDEvento(evento.id)
const setores = listaSetores.items.setor
console.log(setores)

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
function criarLoteSetor(setores){
    const containerSetores = document.querySelector('.setores')
    setores.forEach((setor) => {
        
    })
}

function mesPorNumero(numeroMes) {
    const data = new Date(2024, numeroMes - 1, 1)
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(data)
  }
  
  console.log(mesPorNumero(1))
  console.log(mesPorNumero(12))
  