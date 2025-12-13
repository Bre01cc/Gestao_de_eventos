'use strict'

import { lerUFs } from "./fetch_cadastro_evento.js"
import { lerCategorias } from "./fetch_cadastro_evento.js"
import { criarEvento } from "./fetch_cadastro_evento.js"
import { criarSetor } from "./fetch_cadastro_evento.js"
import { criarLoteIngresso } from "./fetch_cadastro_evento.js"



async function criarOptionsUfs() {
    const listarUfs = await lerUFs()
    const ufs = listarUfs.items.uf
    
    const select = document.getElementById('ufs')
    ufs.forEach(uf => {
        const option = document.createElement('option')
        option.value = uf.id
        option.text = uf.sigla
        select.appendChild(option)
    });
}

async function criarCardsCategoria(categoria) {
    const container = document.querySelector('.container-categoria')

    const itenCategoria = document.createElement('div')
    itenCategoria.className = "item-categoria"
    const nomeCategoria = document.createElement('p')

    nomeCategoria.textContent = categoria.nome
    
    container.appendChild(itenCategoria)
    itenCategoria.appendChild(nomeCategoria)
}

const listarCategorias = await lerCategorias()
const categorias = listarCategorias.items.categorias

categorias.forEach(async (categoria) => {
    await criarCardsCategoria(categoria)
});

criarOptionsUfs()