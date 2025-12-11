'use strict'

const body = document.getElementById('body')
body.classList.add('scroll-horizontal')
const menu = document.getElementById('menu')
menu.classList.add('disable')

const abrirMenu = document.getElementById('abrir-menu').addEventListener('click', () => {
    body.classList.remove('scroll-horizontal')
    body.classList.add('scrooll')
    menu.classList.remove('disable')
    menu.classList.add('active')
})

const fecharMenu = document.getElementById('fechar-menu').addEventListener('click', () => {
    body.classList.remove('scrooll')
    body.classList.add('scroll-horizontal')
    menu.classList.remove('active')
    menu.classList.add('disable')

})  
