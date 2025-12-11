'use strict'

async function lerParticipantes(){

    const url = "http://localhost:8080/v1/webeventos/participante/"
    const response = await fetch(url)
    const participantes = await response.json()
    return participantes
}

async function buscarParticipanteId(id) {
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
}


async function criarParticipante(contato){
    const url = `http://localhost:8080/v1/webeventos/participante/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    return response.ok
}

async function deletarParticipante(id){
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const options = {
        method: "DELETE",
    }

    const response = await fetch(url, options)
    return response.ok
}

async function atualizarParticipante(id, contato){
    const url = `http://localhost:8080/v1/webeventos/participante/${id}`
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options) 
    return response.ok
}

module.exports = {
    lerParticipantes,
    buscarParticipanteId,
    criarParticipante,
    deletarParticipante,
    atualizarParticipante
}