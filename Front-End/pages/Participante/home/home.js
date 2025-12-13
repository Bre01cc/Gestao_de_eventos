'use strict'

import { lerEventos } from "./fetch_home.js"
import { lerUFs } from "./fetch_home.js"

const body = document.getElementById('body')
body.classList.add('scroll-horizontal')
const menu = document.getElementById('menu')
menu.classList.add('disable')
const itens = document.getElementById('itens')
const componentes = document.querySelectorAll('.componente')


const abrirMenu = document.getElementById('abrir-menu').addEventListener('click', () => {
    body.classList.remove('scroll-horizontal')
    body.classList.add('scrooll')
    menu.classList.remove('disable')
    menu.classList.add('active')
    itens.classList.add('animacao-menu')
    componentes.forEach(componente=>{
        componente.classList.add('animacao-componentes')
    })
  

})

const fecharMenu = document.getElementById('fechar-menu').addEventListener('click', () => {
    body.classList.remove('scrooll')
    body.classList.add('scroll-horizontal')
    itens.classList.add('animacao-fechar-menu')
    menu.classList.remove('active')
    menu.classList.add('disable')

    // componentes.forEach(componente=>{
    //     componente.classList.add('')
    // })

})

async function criarOptionsUfs() {
    const listarUfs = await lerUFs()
    const ufs = listarUfs.items.uf
    
    const select = document.getElementById('ufs')
    ufs.forEach(uf => {
        const option = document.createElement('option')
        option.value = uf.id
        option.text = uf.sigla
        select.appendChild(option)
    });
}

await criarOptionsUfs()

const listarEventos = await lerEventos() 
const eventos = listarEventos.items.eventos

async function criarCardEvento(evento){
    
    const container = document.querySelector('.container-eventos')

    const cardEvento = document.createElement('div')
    evento.className = "evento"

    const nomeEvento = document.createElement('p')
    nomeEvento.className = "nome-evento"
    const br = document.createElement('br')
    const dataEvento = document.createElement('span')
    const imagemEvento = document.createElement('img')

    const transparencia = document.createElement('div')
    transparencia.className = "transparencia"
    const linha = document.createElement('div')
    linha.className = "linha"
    
    nomeEvento.textContent = evento.nome
    dataEvento.textContent = evento.data
    imagemEvento.src = evento.capa_url

    cardEvento.append(nomeEvento, imagemEvento, linha)
    nomeEvento.append(br, dataEvento)

    container.appendChild(cardEvento)

}

eventos.forEach((evento) => {
    criarCardEvento(evento)
})



