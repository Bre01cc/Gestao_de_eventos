'use strict'


export async function criarEvento(evento){
    const url = `http://localhost:8080/v1/webeventos/organizador/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(evento)
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function criarSetor(setor){
    const url = `http://localhost:8080/v1/webeventos/organizador/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(setor)
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function criarLoteIngresso(lote){
    const url = `http://localhost:8080/v1/webeventos/organizador/`
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(lote)
    }

    const response = await fetch(url, options)
    return response.json()
}


export async function lerCategorias(){
    const url = "http://localhost:8080/v1/webeventos/categoria/"
    const response = await fetch(url)
    const ufs = await response.json()
    return ufs
}

export async function buscarCategoriaId(id) {
    const url = `http://localhost:8080/v1/webeventos/categoria/${id}`
    const response = await fetch(url)
    const uf = await response.json()
    return uf
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


export async function lerTiposIngresso(){
    const url = "http://localhost:8080/v1/webeventos/tipo-ingresso/"
    const response = await fetch(url)
    const ufs = await response.json()
    return ufs
}

export async function buscarTipoIngressoId(id) {
    const url = `http://localhost:8080/v1/webeventos/tipo-ingresso/${id}`
    const response = await fetch(url)
    const uf = await response.json()
    return uf
}