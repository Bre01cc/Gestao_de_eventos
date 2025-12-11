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
    return response.ok
}

export async function deletarParticipante(id){
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const options = {
        method: "DELETE",
    }

    const response = await fetch(url, options)
    return response.ok
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
    return response.ok
}

const participante = {
    "nome": "Weslei Santos",
    "cpf": "12345678910",
    "data_nascimento": "2001-10-18",
    "telefone": "(11)90000-0001",
    "email": "fulano@email.com",
    "senha": "senhaWeslei123"
}
