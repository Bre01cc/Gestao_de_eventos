'use strict'

import { lerOrganizador } from "../fetch_organizador.js"


const mensagemErro = document.getElementById('mensagem-erro')
mensagemErro.classList.add('disable');

document.getElementById('bnt-erro').addEventListener('click', () => {
    mensagemErro.classList.remove('active');
    mensagemErro.classList.add('disable');
})

document.getElementById('acessar').addEventListener('click', async (event) => {
    event.preventDefault()
    
    const verificar = await verificarLogin()
    
    if(verificar){
        sessionStorage.setItem('organizador', JSON.stringify(verificar))
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

    const listarOrganizadores = await lerOrganizador()
    const organizadores = listarOrganizadores.items

    const verifica = organizadores.find(organizador => 
    (organizador.cnpj == meioDeAcesso || organizador.email == meioDeAcesso) &&
    organizador.senha == senha )
    return verifica

}