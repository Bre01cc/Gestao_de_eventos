'use strict'

export async function lerEnderecos(){
    const url = "http://localhost:8080/v1/webeventos/endereco-participante/"
    const response = await fetch(url)
    const participantes = await response.json()
    return participantes
}

export async function buscarEnderecoId(id) {
    const url = `http://localhost:8080/v1/webeventos/endereco-participante/${id}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
}

export async function buscarEnderecoParticipanteId(participanteID) {
    const url = `http://localhost:8080/v1/webeventos/endereco-participante/participante/${participanteID}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
}


export async function criarEndereco(endereco){
    const url = `http://localhost:8080/v1/webeventos/endereco-participante/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(endereco)
    }

    const response = await fetch(url, options)
    return response.json()
}


export async function atualizarEndereco(id, endereco){
    const url = `http://localhost:8080/v1/webeventos/endereco-participante/${id}`
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(endereco)
    }

    const response = await fetch(url, options) 
    return response.json()
}

export async function lerUFs(){
    const url = "http://localhost:8080/v1/webeventos/uf/"
    const response = await fetch(url)
    const ufs = await response.json()
    return ufs
}

export async function buscarUFId(id) {
    const url = `http://localhost:8080/v1/webeventos/uf/${id}`
    const response = await fetch(url)
    const uf = await response.json()
    return uf
}