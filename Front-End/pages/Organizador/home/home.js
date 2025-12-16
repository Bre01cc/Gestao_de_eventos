'use strict'

import { lerEventos } from "../fetch_organizador.js"

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

const organizador = JSON.parse(sessionStorage.getItem('organizador'))
console.log(organizador)

const listarEventos = await lerEventos()
const eventos = listarEventos.items.eventos


//const eventosOrganizador = eventos.find(evento => evento.id_organizador == organizador.id)

//eventosOrganizador.forEach((evento) => {
    //criarCardEvento(evento)
//})


document.querySelector(".UF").addEventListener("change", async function () {
    const containerEventos = document.querySelector(".container-eventos")

    containerEventos.replaceChildren()
    
    const ufSelecionada = this.options[this.selectedIndex].text
    const listaEventosUF = await filtarEventosUF(ufSelecionada)

    for (const evento of listaEventosUF) {
        await criarCardEvento(evento)
    }
})

document.querySelector(".filtro").addEventListener("change", async function () {
    const containerEventos = document.querySelector(".container-eventos")

    containerEventos.replaceChildren()
    
    const categoriaSelecionada = this.options[this.selectedIndex].text
    const listaEventosCategoria = await filtrarEventosCategoria(categoriaSelecionada)

    for (const evento of listaEventosCategoria) {
        await criarCardEvento(evento)
    }
})


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

    const linha = document.createElement('linha')
    linha.className = 'linha'

    container.appendChild(divEvento)
    divEvento.append(nomeEvento, imagemEvento, transparencia, linha)
    nomeEvento.append(br, dataEvento)
}

function filtarEventosUF(uf){
    const eventosUF = eventos.filter(evento => evento.sigla == uf && evento.id_organizador == organizador.id)
    return eventosUF
}


function filtrarEventosCategoria(categoriaNome) {
    const filtro = eventos.filter(evento =>
        evento.categorias.some(categoria => categoria.categoria_nome == categoriaNome ) 
        && evento.id_organizador == organizador.id)
    return filtro
}

document.querySelector('.cadastrar').addEventListener('click', () => {
    sessionStorage.setItem('organizador', JSON.stringify(organizador))
    window.location.href = '../cadastro_evento/index.html'
})




