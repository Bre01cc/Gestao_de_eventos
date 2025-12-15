'use strict'

import { uploadImageToAzure } from "./uploadAzure.js"

import { lerTiposIngresso, lerUFs } from "./fetch_cadastro_evento.js"
import { lerCategorias } from "./fetch_cadastro_evento.js"
import { criarEvento } from "./fetch_cadastro_evento.js"
import {criarSetor} from './fetch_cadastro_evento.js'
import {criarLoteIngresso} from './fetch_cadastro_evento.js'

let categoriasSelecionadas = []; 

function ativarSelecaoCategorias() {
    const container = document.querySelector('.container-categoria');

    container.addEventListener('click', (event) => {
        const item = event.target.closest('.item-categoria');
        if (!item) return;

        const id = Number(item.dataset.id);

        // Verifica se a categoria já está selecionada
        const index = categoriasSelecionadas.findIndex(
            cat => cat.categoria_id === id
        );

        if (index !== -1) {
            // Já existe → remove
            categoriasSelecionadas.splice(index, 1);
            item.classList.remove('selecionado');
        } else {
            // Não existe → adiciona
            categoriasSelecionadas.push({ categoria_id: id });
            item.classList.add('selecionado');
        }

        console.log(categoriasSelecionadas)
    });
}

const organizador = sessionStorage.getItem('organizador')


const imgEvento = document.querySelector('.img-evento')
const inputFoto = document.getElementById('foto-evento')

imgEvento.addEventListener('click', () => {
    inputFoto.click()
})

inputFoto.addEventListener('change', ({ target }) => {
    const file = inputFoto.src = URL.createObjectURL(target.files[0])
    console.log(file)

    if (!file) return

    imgEvento.style.backgroundImage = `url(${file})`
    imgEvento.style.backgroundSize = 'cover'
    imgEvento.style.backgroundPosition = 'center'
    imgEvento.style.backgroundRepeat = 'no-repeat'
})

//Cadastrar Imagem no storage da Azure
async function uplodImge() {
    const uploadParams = {
        storageAccount: 'uploadgestao',
        containerName: 'gestao-evento',
        file: inputFoto.files[0],
        sasToken: 'sp=racwl&st=2025-12-14T22:40:51Z&se=2025-12-19T06:55:51Z&sv=2024-11-04&sr=c&sig=EqQEXnwHo3y0bIpUoOWTF5xyAEiNCSdioRX7Z2qlhhM%3D'
    }
    const image = await uploadImageToAzure(uploadParams)

    const data = document.getElementById('data').value
    const novoEvento = {
        
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        data: formatarData(data),
        capa_url: image,
        id_organizador: organizador.id,
        id_status_evento: 1,
        endereco: {
            cep: document.getElementById('cep').value,
            cidade: document.getElementById('cidade').value,
            bairro: document.getElementById('bairro').value,
            numero: document.getElementById('numero').value,
            logradouro: document.getElementById('logradouro').value,
            id_uf: document.getElementById('ufs').value
        },
        categoria: categoriasSelecionadas
    }

    console.log(novoEvento)
    const cadastro = await criarEvento(novoEvento)
    console.log(cadastro)

    if(cadastro)
        alert('Evento cadastrado com sucesso')
    else
        alert('Não foi possível cadastrar o Evento')

    const setor = {
        nome: document.querySelector('.InputSetor').value,
        capacidade: document.querySelector('.Capacidade').value,
        capacidade_atual: document.querySelector('.CapacidadeAtual').value,
        id_evento: cadastro.items.id
    }
    
    const inserirSetor = await criarSetor(setor)
    
    if(inserirSetor){
        const dataVenda = document.getElementById('data-venda').value
        const lote = {
            numero: document.getElementById('numero-ingresso').value,
            quantidade: document.getElementById('quantidade').value,
            valor: document.getElementById('valor').value,
            data_inicio_venda: formatarData(dataVenda),
            id_setor: inserirSetor.items.setor.id,
            id_tipo_ingresso: document.getElementById('tipos').value
        }
        console.log(lote)
        
        const inserirLote = await criarLoteIngresso(lote)
        console.log(inserirLote)
    }

    
}

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


criarOptionsUfs()
criarOptionsTipoIngresso()
ativarSelecaoCategorias()


document.getElementById('cadastrar').addEventListener('click', async (event) => {
    event.preventDefault()
    await uplodImge()
})



//Adicionar mais campos de ingresso
const ingresso = document.getElementById('ingresso')
let adicionarIngresso = ingresso.querySelector('.Adicionar')
let removerIngresso = ingresso.querySelector('.Remover')
let bntIngresso = ingresso.querySelector('.bntIngresso')

adicionarIngresso.addEventListener('click', () => {
    const numero = document.createElement('div')
    numero.classList.add('input-box')
    numero.classList.add('numeroIngresso')

    numero.style.marginTop = '50px'

    const inputNumero = document.createElement('input')
    inputNumero.type = 'text';
    inputNumero.placeholder = 'Numero';
    inputNumero.required = true

    numero.appendChild(inputNumero)

    const quantidade = document.createElement('div')
    quantidade.classList.add('input-box')
    quantidade.classList.add('quantidadeIngresso')

    const inputQuantidade = document.createElement('input')
    inputQuantidade.type = 'text';
    inputQuantidade.placeholder = 'Quantidade';
    inputNumero.required = true

    quantidade.append(inputQuantidade)

    const valor = document.createElement('div')
    valor.classList.add('input-box')
    valor.classList.add('valorIngresso')

    const inputValor = document.createElement('input')
    inputValor.type = 'text';
    inputValor.placeholder = 'Valor';
    inputValor.required = true

    valor.append(inputValor)

    const dataInicio = document.createElement('div')
    dataInicio.classList.add('input-box')
    dataInicio.classList.add('dataInicioIngresso')

    const inputDataInicio = document.createElement('input')
    inputDataInicio.type = 'text';
    inputDataInicio.placeholder = 'Data inicio venda';
    inputDataInicio.required = true

    dataInicio.append(inputDataInicio)

    const tipo = document.createElement('div')
    tipo.classList.add('input-box')
    tipo.classList.add('tipoIngresso')

    const inputTipo = document.createElement('input')
    inputTipo.type = 'text';
    inputTipo.placeholder = 'Tipo';
    inputTipo.required = true

    tipo.append(inputTipo)

    const setor = document.createElement('div')
    setor.classList.add('input-box')
    setor.classList.add('setorIngresso')

    const inputSetor = document.createElement('input')
    inputSetor.type = 'text';
    inputSetor.placeholder = 'Setor';
    inputSetor.required = true

    setor.append(inputSetor)

    bntIngresso.append(removerIngresso, adicionarIngresso)
    ingresso.append(numero, quantidade, valor, dataInicio, tipo, setor, bntIngresso)

})

//Adicionar mais campos para setor
const setor = document.getElementById('setor')

let adicionarSetor = setor.querySelector('.Adicionar')
let removerSetor = setor.querySelector('.Remover')
let bntSetor = setor.querySelector('.bntSetor')

adicionarSetor.addEventListener('click', () => {

    const nomeSetor = document.createElement('div')
    nomeSetor.classList.add('nomeSetor')
    nomeSetor.classList.add('input-box')

    nomeSetor.style.marginTop = '50px'

    const inputSetor = document.createElement('input')
    inputSetor.classList.add('InputSetor')

    inputSetor.type = 'text';
    inputSetor.placeholder = 'Nome setor'
    inputSetor.required = true;



    nomeSetor.append(inputSetor)

    const capacidadeSetor = document.createElement('div')
    capacidadeSetor.classList.add('capacidadeSetor')
    capacidadeSetor.classList.add('input-box')

    const inputCapacidade = document.createElement('input')
    inputCapacidade.classList.add('InputSetor')


    inputCapacidade.type = 'text';
    inputCapacidade.placeholder = 'Capacidade';
    inputCapacidade.required = true;

    capacidadeSetor.append(inputCapacidade)

    const capacidadeAtualSetor = document.createElement('div')
    capacidadeAtualSetor.classList.add('capacidadeAtualSetor')
    capacidadeAtualSetor.classList.add('input-box')

    const inputCapacidadeAtual = document.createElement('input')
    inputCapacidadeAtual.classList.add('InputSetor')

    inputCapacidadeAtual.type = 'text';
    inputCapacidadeAtual.placeholder = 'Capacidade Atual';
    inputCapacidadeAtual.required = true;

    capacidadeAtualSetor.append(inputCapacidadeAtual)

    bntSetor.append(removerSetor, adicionarSetor)
    setor.append(nomeSetor, capacidadeSetor, capacidadeAtualSetor, bntSetor)

})

function formatarData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}
