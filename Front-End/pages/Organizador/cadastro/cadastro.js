'use strict'

import { criarOrganizador } from "../fetch_organizador.js"
import { lerUFs } from "../fetch_organizador.js"

document.getElementById('voltar').onclick = ()=>{
    window.location.href = "../login/index.html"
}


async function criarOptionsUfs() {
    const listarUfs = await lerUFs()
    const ufs = listarUfs.items.uf
    
    const select = document.getElementById('ufs')
    ufs.forEach(uf => {
        const option = document.createElement('option')
        option.value = uf.id
        option.text = uf.sigla
        select.appendChild(option)
    });
}

async function CriarNovoOrganizador(){
    const novoOrganizador = {
        nome_fantasia: document.getElementById('nome-fantasia').value,
        razao_social: document.getElementById('razao-social').value,
        cnpj: document.getElementById('cnpj').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value,
        confirmar_senha: document.getElementById('confirmar-senha').value,
        endereco: {
            cep: document.getElementById('cep').value,
            cidade: document.getElementById('cidade').value,
            bairro: document.getElementById('bairro').value,
            numero: document.getElementById('numero').value,
            logradouro: document.getElementById('logradouro').value,
            id_uf: document.getElementById('ufs').value
        }
    }

    if(novoOrganizador.senha == novoOrganizador.confirmar_senha){
        delete novoOrganizador.confirmar_senha
        const inserir = await criarOrganizador(novoOrganizador)
        return inserir 
    }
    else{
        return alert('Senhas não correspondem')
    }
}

await criarOptionsUfs()

const buttonFinalizar = document.querySelector('.finalizar')
buttonFinalizar.addEventListener('click', async (event)  => {
    event.preventDefault()
    const inserirOrganizador = await CriarNovoOrganizador()

    if(inserirOrganizador.status == true)
        alert('Criado com Sucesso')
    

})