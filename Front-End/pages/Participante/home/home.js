'use strict'

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
