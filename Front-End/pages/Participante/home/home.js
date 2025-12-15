'use strict'

import {lerUFs} from '../fetch_endereco_participante.js'
import { lerEventos } from "../fetch_participante.js"

const body = document.getElementById('body')
body.classList.add('scroll-horizontal')

const menu = document.getElementById('menu')
menu.classList.add('disable')

const headerMenu = document.getElementById('header-menu')

const itens = document.getElementById('itens')

const componentes = document.querySelectorAll('.componente')

const menuHeader = document.getElementById('header-menu')


//Função com objetivo de fazer o menu aparecer
const abrirMenu = document.getElementById('abrir-menu').addEventListener('click', () => {

    body.classList.remove('scroll-horizontal')
    body.classList.add('scroll')

    menu.classList.remove('disable')
    menu.classList.add('active')

    itens.classList.remove('animacao-fechar-menu')
    itens.classList.add('animacao-menu')

    headerMenu.classList.remove('animacao-fechar-componentes')
    headerMenu.classList.add('animacao-componentes')

    componentes.forEach(componente => {
        componente.classList.remove('animacao-fechar-componentes')
        componente.classList.add('animacao-componentes')
    })
})

//Função com objetivo de fazer o menu desaparecer
const fecharMenu = document.getElementById('fechar-menu').addEventListener('click', () => {
    body.classList.remove('scroll')
    body.classList.add('scroll-horizontal')

    itens.classList.remove('animacao-menu')
    itens.classList.add('animacao-fechar-menu')

    headerMenu.classList.remove('animacao-componentes')
    headerMenu.classList.add('animacao-fechar-componentes')

    componentes.forEach(componente => {
        componente.classList.remove('animacao-componentes')
        componente.classList.add('animacao-fechar-componentes')
    })
    setTimeout(() => {
        menu.classList.remove('active')
        menu.classList.add('disable')
    }, 3000)


})





async function criarOptionsUfs() {
    const listarUfs = await lerUFs()
    const ufs = listarUfs.items.uf

    const select = document.getElementById('uf')
    ufs.forEach(uf => {
        const option = document.createElement('option')
        option.value = uf.id
        option.text = uf.sigla
        select.appendChild(option)
    });
}


function criarCardEvento(evento){
    const container = document.querySelector('.container-eventos')

    const divEvento = document.createElement('div')
    divEvento.className = 'evento'

    const nomeEvento = document.createElement('p')
    nomeEvento.className = 'nome-evento'
    nomeEvento.textContent = evento.nome

    const br = document.createElement('br')

    const dataEvento = document.createElement('span')
    dataEvento.textContent = evento.data

    const imagemEvento = document.createElement('img')
    imagemEvento.src = evento.capa_url
    
    const transparencia = document.createElement('div')
    transparencia.className = 'transparencia'

    const linha = document.createElement('div')
    linha.className = 'linha'

    container.appendChild(divEvento)
    divEvento.append(nomeEvento, imagemEvento, transparencia, linha)
    nomeEvento.append(br, dataEvento)

    divEvento.addEventListener('click', () => {
        sessionStorage.setItem("evento", JSON.stringify(evento))
        window.location.href = "../../info_evento/index.html"
    })

    
}

const listarEventos = await lerEventos()
const eventos = listarEventos.items.eventos
console.log(eventos)
eventos.forEach((evento) => {
    criarCardEvento(evento)
})

criarOptionsUfs()

function filtarEventosUF(uf){
    const eventosUF = eventos.filter(evento => evento.sigla == uf)
    return eventosUF
}

function filtrarEventosCategoria(categoriaNome) {
    const filtro = eventos.filter(evento =>
        evento.categorias.some(categoria => categoria.categoria_nome == categoriaNome ) 
    )
    return filtro
}

document.querySelector(".uf").addEventListener("change", async function () {
    const containerEventos = document.getElementById("container-eventos")

    containerEventos.replaceChildren()
    
    const ufSelecionada = this.options[this.selectedIndex].text
    const listaEventosUF = await filtarEventosUF(ufSelecionada)

    for (const evento of listaEventosUF) {
        await criarCardEvento(evento)

        
    }
})





