'use strict'

export async function lerEventos(){
    const url = "http://localhost:8080/v1/webeventos/evento/"
    const response = await fetch(url)
    const participantes = await response.json()
    return participantes
}

export async function buscarEventoId(id) {
    const url = `http://localhost:8080/v1/webeventos/evento/${id}`
    const response = await fetch(url)
    const participante = await response.json()
    return participante
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