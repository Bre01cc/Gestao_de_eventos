'use strict'

import { criarParticipante } from "../fetch_participante.js" 


document.getElementById('voltar').onclick = ()=>{
    window.location.href = "../login/index.html"
}


async function CriarNovoParticipante(){
    
    const novoParticipante = {
        "nome": document.getElementById('nome').value,
        "cpf": document.getElementById('cpf').value,
        "data-nascimento": document.getElementById('data-nascimento').value,
        "email": document.getElementById('email').value,
        "telefone": document.getElementById('telefone').value,
        "senha": document.getElementById('senha').value,
        "senha_confirmada": document.getElementById('confirmar-senha').value
    }
    console.log(novoParticipante)

    if(novoParticipante.senha == novoParticipante.senha_confirmada){
        delete novoParticipante.senha_confirmada
        const inserir = await criarParticipante(novoParticipante)
        console.log(inserir)
        return inserir
    }
    else{
        return alert('Senhas não correspondem')
    }

}

const buttonFinalizar = document.querySelector('.finalizar')
buttonFinalizar.addEventListener('click', async (e)  => {
    e.preventDefault()
    const inserirParticipante = await CriarNovoParticipante()

    if(inserirParticipante.status == true)
        alert('Criado com Sucesso')
    
})