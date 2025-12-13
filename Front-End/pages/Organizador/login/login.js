'use strict'

import { lerOrganizador } from "../fetch_organizador.js"

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

    const listarOrganizadores = await lerOrganizador()
    const organizadores = listarOrganizadores.items
    console.log(organizadores)

    
    const verifica = organizadores.find(organizador => 
    (organizador.cnpj === meioDeAcesso || organizador.email === meioDeAcesso) &&
    organizador.senha === senha )

    return verifica

}

const buttonAcesar = document.querySelector('.acessar')
buttonAcesar.addEventListener('click', async () => {
    const verificar = await verificarLogin()
    if(verificar != undefined || verificar != null)
        return verificar
})





