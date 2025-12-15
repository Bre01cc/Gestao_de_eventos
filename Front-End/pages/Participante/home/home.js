'use strict'

// Váriavel para guardar alguns elementos do HTML com objetivo de criar um menu dinâmico
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


