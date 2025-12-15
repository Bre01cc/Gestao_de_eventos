'use strict'

import { lerTiposIngresso, lerUFs } from "./fetch_cadastro_evento.js"
import { lerCategorias } from "./fetch_cadastro_evento.js"
import { criarEvento } from "./fetch_cadastro_evento.js"
import { criarSetor } from "./fetch_cadastro_evento.js"
import { criarLoteIngresso } from "./fetch_cadastro_evento.js"

const organizador = sessionStorage.getItem('organizador')




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


async function criarOptionsTipoIngresso() {
    const listarTipos = await lerTiposIngresso()
    const ufs = listarTipos.items.ticket
    
    const select = document.getElementById('tipos')
    ufs.forEach(tipo => {
        const option = document.createElement('option')
        option.value = tipo.id
        option.text = tipo.tipo
        select.appendChild(option)
    });
}


async function criarCardsCategoria(categoria) {
    const container = document.querySelector('.container-categoria')

    const itenCategoria = document.createElement('div')
    itenCategoria.dataset.id = categoria.id

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



const categoriasSelecionadas = new Set(); 

function ativarSelecaoCategorias() {
    const container = document.querySelector('.container-categoria');
    
    container.addEventListener('click', (event) => {
        const item = event.target.closest('.item-categoria')
        if (!item) return

        const id = item.dataset.id;

        if (categoriasSelecionadas.has(id)) {
            categoriasSelecionadas.delete(id)
            item.classList.remove('selecionado')
        } else {
            categoriasSelecionadas.add(id)
            item.classList.add('selecionado')
        }

        // Atualiza o array categorias do objeto evento
        novoEvento.categoria = Array.from(categoriasSelecionadas).map(id => ({
            categoria_id: Number(id) // garante que seja um número
        }));

    })
}

criarOptionsUfs()
criarOptionsTipoIngresso()
ativarSelecaoCategorias()



 const novoEvento = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        capa_url: '',
        //id_organizador: organizador.id,
        id_status_evento: 1,
        endereco: {
            cep: document.getElementById('cep').value,
            cidade: document.getElementById('cidade').value,
            bairro: document.getElementById('bairro').value,
            numero: document.getElementById('numero').value,
            logradouro: document.getElementById('logradouro').value,
            id_uf: document.getElementById('ufs').value
        },
        categoria: [

        ]
}

document.querySelector('.Cadastrar').addEventListener('click', async () => {
    await criarEvento(novoEvento)
})


