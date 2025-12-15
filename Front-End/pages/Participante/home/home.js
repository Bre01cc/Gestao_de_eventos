'use strict'

import { lerUFs } from '../fetch_endereco_participante.js'
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


function criarCardEvento(evento) {
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


    imagemEvento.onerror = () => {
        imagemEvento.src = '../../../img/fundo.png'
    }

    const transparencia = document.createElement('div')
    transparencia.className = 'transparencia'

    const linha = document.createElement('div')
    linha.className = 'linha'

    container.appendChild(divEvento)
    divEvento.append(nomeEvento, imagemEvento, transparencia, linha)
    nomeEvento.append(br, dataEvento)

    //Criando uma váriavel que vai guardar as três seções que guardam os eventos
    let secaoEventos = document.querySelectorAll('.eventos')

    //Objetivo desse forEach e adicionar carrossel para cada seção


    secaoEventos.forEach(secao => {
        const containerEvento = secao.querySelector('.container-eventos')
        let evento = secao.querySelectorAll('.evento')


        const previousB = () => {
            if (evento.length > 0) {
                //Ele está pegando o primeiro elemento da lista de items e adicionando no final do containerItems
                containerEvento.appendChild(evento[0]);
                //Aqui ele está carregando a agora com o primeiro elemento no final
                evento = secao.querySelectorAll('.evento');
            } else {
                console.log('Erro')
            }

        }

        const nextB = () => {

            if (evento.length > 0) {
                //Aqui ele está pegando a posição do ultimo elemento de 
                const lastEvento = evento[evento.length - 1]
                //Aqui ele está pegando o ultimo elemento e inserindo antes(em primeiro lugar)
                containerEvento.insertBefore(lastEvento, evento[0]);
                //Aqui ele está carregando a lista após as mudanças
                evento = secao.querySelectorAll('.evento');
            } else {
                console.log('Erro')
            }

        }
        let previous = secao.querySelector('.previous')
        let next = secao.querySelector('.next')
        previous.addEventListener('click', previousB)
        next.addEventListener('click', nextB)

    })
}

const listarEventos = await lerEventos()
const eventos = listarEventos.items.eventos
console.log(eventos)
eventos.forEach((evento) => {
    criarCardEvento(evento)
})

criarOptionsUfs()

function filtarEventosUF(uf) {
    const eventosUF = eventos.filter(evento => evento.sigla == uf)
    return eventosUF
}

async function filtrarEventosCategoria(categoriaNome) {
    console.log(eventos)
    const filtro = eventos.forEach(evento => {
        evento.categorias.forEach(categoria => {
            if (categoria.categoria_nome == categoriaNome) {
                filtro = categoria
            }

        })
        console.log(evento)

    })
    return filtro
}

// function filtrarEventosCategoria(categoriaNome) {
//     const filtro = eventos.filter(evento =>
//         evento.categorias.some(categoria => categoria.categoria_nome == categoriaNome)
//     )
//     return filtro
// }

filtrarEventosCategoria('Teatr')



document.querySelector(".uf").addEventListener("change", async function () {
    const containerEventos = document.querySelector(".container-eventos")



    const ufSelecionada = this.options[this.selectedIndex].text
    console.log(ufSelecionada)
    const listaEventosUF = await filtarEventosUF(ufSelecionada)

    console.log(listaEventosUF)
    if (listaEventosUF.length > 0) {
        alert('Não foram encontrados')
        containerEventos.replaceChildren()
        for (const evento of listaEventosUF) {
            await criarCardEvento(evento)
        }
    }

})







