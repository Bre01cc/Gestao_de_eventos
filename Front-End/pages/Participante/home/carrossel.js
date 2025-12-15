'use strict'

//Criando uma váriavel que vai guardar as três seções que guardam os eventos
let secaoEventos = document.querySelectorAll('.eventos')

//Objetivo desse forEach e adicionar carrossel para cada seção
secaoEventos.forEach(secao => {
    const containerEvento = secao.querySelector('.container-eventos')
    let evento = secao.querySelectorAll('.evento')


    const previousB = () => {
        //Ele está pegando o primeiro elemento da lista de items e adicionando no final do containerItems
        containerEvento.appendChild(evento[0]);
        //Aqui ele está carregando a agora com o primeiro elemento no final
        evento = secao.querySelectorAll('.evento');
    }

    const nextB = () => {
        //Aqui ele está pegando a posição do ultimo elemento de items
        const lastEvento = evento[evento.length - 1]
        //Aqui ele está pegando o ultimo elemento e inserindo antes(em primeiro lugar)
        containerEvento.insertBefore(lastEvento, evento[0]);
        //Aqui ele está carregando a lista após as mudanças
        evento = secao.querySelectorAll('.evento');
    }
    let previous = secao.querySelector('.previous')
    let next = secao.querySelector('.next')
    previous.addEventListener('click', previousB)
    next.addEventListener('click', nextB)

})


