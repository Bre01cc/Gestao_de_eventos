'use strict'

export async function lerParticipantes(){

    const url = "http://localhost:8080/v1/webeventos/participante/"
    const response = await fetch(url)
    const participantes = await response.json()
    return participantes
}

export async function buscarParticipanteId(id) {
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
}


export async function criarParticipante(participante){
    const url = `http://localhost:8080/v1/webeventos/participante/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(participante)
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function deletarParticipante(id){
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const options = {
        method: "DELETE",
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function atualizarParticipante(id, participante){
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(participante)
    }

    const response = await fetch(url, options) 
    return response.json()
}

const participante = {
    "nome": "Weslei Santos",
    "cpf": "12345678910",
    "data_nascimento": "2001-10-18",
    "telefone": "(11)90000-0001",
    "email": "fulano@email.com",
    "senha": "senhaWeslei123"
}

const participante2 = { 
    nome: "ENZO FELIX CARRILHO",
    cpf: "12345678910",
    data_nascimento: "2005-09-25", // corrigido
    email: "enzo25@gmail.com",
    telefone: "(11)95978-8007", // coloque no mesmo formato do outro se necessário
    senha: "123" // coloque uma senha válida
}


//const inserir = await criarParticipante(participante2)
//console.log(inserir)

