'use strict'

import {lerUFs} from "../fetch_endereco_participante.js"
import { criarParticipante } from "../fetch_participante.js"
import { criarEndereco } from "../fetch_endereco_participante.js" 


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

async function CriarNovoParticipante(){
    
    const novoParticipante = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento : document.getElementById('data-nascimento').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value,
        senha_confirmada: document.getElementById('confirmar-senha').value // ← agora funciona
    }

    if(novoParticipante.senha == novoParticipante.senha_confirmada){
        delete novoParticipante.senha_confirmada
        const inserir = await criarParticipante(novoParticipante)
        return inserir
    }
    else{
        return alert('Senhas não correspondem')
    }

}

async function criarEnderecoParticipante(participanteID) {


    const enderecoParticipante = {
        cep: document.getElementById('cep').value,
        bairro: document.getElementById('bairro').value,
        cidade : document.getElementById('cidade').value,
        numero: document.getElementById('numero').value,
        logradouro: document.getElementById('logradouro').value,
        id_uf: Number(document.getElementById('ufs').value),
        id_participante: Number(participanteID)
    }

    const inserir = await criarEndereco(enderecoParticipante)
    return inserir
}



await criarOptionsUfs()

const buttonFinalizar = document.querySelector('.finalizar')
buttonFinalizar.addEventListener('click', async (event)  => {
    event.preventDefault()
    const inserirParticipante = await CriarNovoParticipante()

    if(inserirParticipante.status == true){
        const id_participante = inserirParticipante.items.participante.id
        
        const inserirEndereco = await criarEnderecoParticipante(id_participante)
        console.log(inserirEndereco)
        if(inserirEndereco.status == true)
            alert('Criado com Sucesso')
    }

        
    
})

