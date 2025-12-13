'use strict'

import { lerEnderecos } from "../fetch_endereco_participante.js"

const mensagemErro = document.getElementById('mensagem-erro')
mensagemErro.classList.add('disable');

document.getElementById('bnt-erro').addEventListener('click', () => {
    mensagemErro.classList.remove('active');
    mensagemErro.classList.add('disable');
})

document.getElementById('acessar').addEventListener('click', () => {
    mensagemErro.classList.remove('disable');
    mensagemErro.classList.add('active');
})

async function verificarLogin() {
    const meioDeAcesso = document.getElementById('meio-de-acesso')
    const senha = document.getElementById('senha')

    const listarParticipantes = await lerEnderecos()
    const participantes = listarParticipantes.items
    console.log(participantes)
   
    
}

verificarLogin()






