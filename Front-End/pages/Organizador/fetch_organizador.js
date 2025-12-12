'use strict'

export async function lerOrganizador(){

    const url = "http://localhost:8080/v1/webeventos/organizador/"
    const response = await fetch(url)
    const participantes = await response.json()
    return participantes
}

export async function buscarOrganizadorId(id) {
    const url = `http://localhost:8080/v1/webeventos/organizador/${id}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
}


export async function criarOrganizador(organizador){
    const url = `http://localhost:8080/v1/webeventos/organizador/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(organizador)
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function deletarOrganizador(id){
    const url = `http://localhost:8080/v1/webeventos/organizador/${id}`
    const options = {
        method: "DELETE",
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function atualizarOrganizador(id, organizador){
    const url = `http://localhost:8080/v1/webeventos/organizador/${id}`
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(organizador)
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



