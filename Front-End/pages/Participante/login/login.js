'use strict'

import { lerEnderecos } from "../fetch_endereco_participante.js"
import { lerParticipantes } from "../fetch_participante.js";

const mensagemErro = document.getElementById('mensagem-erro')
mensagemErro.classList.add('disable');

document.getElementById('bnt-erro').addEventListener('click', () => {
    mensagemErro.classList.remove('active');
    mensagemErro.classList.add('disable');
})

document.getElementById('acessar').addEventListener('click', async(event) => {
    event.preventDefault()

    const verificar = await verificarLogin()
    
    if(verificar){
        sessionStorage.setItem('participante', JSON.stringify(verificar))
        window.location.href = '../home/index.html'        
    }
    else{
        mensagemErro.classList.remove('disable');
        mensagemErro.classList.add('active');
    }    
    
})

async function verificarLogin() {
    const meioDeAcesso = document.getElementById('meio-de-acesso').value
    const senha = document.getElementById('senha').value

    const listarParticipantes = await lerParticipantes()
    console.log(listarParticipantes)
    const participantes = listarParticipantes.items.participantes

    const verifica = participantes.find(organizador => 
    (organizador.cpf == meioDeAcesso || organizador.email == meioDeAcesso) && organizador.senha == senha )
    return verifica
}









