'use strict'

document.getElementById('voltar').onclick = ()=>{
    window.location.href = "../login/index.html"
}

const fetch = require('../fetch_participante.js')

function CriarNovoParticipante(){
    
    const novoParticipante = {
        "nome": document.getElementById('nome').value,
        "cpf": document.getElementById('cpf').value,
        "email": document.getElementById('email').value,
        "telefone": document.getElementById('telefone').value,
        "senha": document.getElementById('senha').value,
        "senha_confirmada": document.getElementById('confirmar-senha').value
    }

    if(novoParticipante.senha == novoParticipante.senha_confirmada){
        fetch.criarParticipante(novoParticipante)
    }
    else{
        alert('Senhas não correspondem')
    }

}

const buttonFinalizar = document.querySelector('.finalizar')
buttonFinalizar.addEventListener('click', () => {
    const inserirParticipante = CriarNovoParticipante()

    if(inserirParticipante.status == true)
        alert('Criado com Sucesso')
    
})