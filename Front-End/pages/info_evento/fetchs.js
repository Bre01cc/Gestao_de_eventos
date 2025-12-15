'use strict'

export async function lerSetorIDEvento(id){

    const url = `http://localhost:8080/v1/webeventos/setor/evento/${id}`
    const response = await fetch(url)
    const setores = await response.json()
    return setores
}