'use strict'

import { uploadImageToAzure } from "./uploadAzure.js"
// //Criando uma Váriavel para guardar todas as categorias
const itensCategoria = document.querySelectorAll('.item-categoria')

// //Mudar cor da categoria quando for clicada
itensCategoria.forEach(item => {
    let cor = true
    item.classList.add('cor-item-padrao')

    item.addEventListener('click', () => {
        if (cor) {
            item.classList.remove('cor-item-padrao')
            item.classList.add('cor-item-click')
            cor = false
        } else {
            item.classList.remove('cor-item-click')
            item.classList.add('cor-item-padrao')
            cor = true
        }

    })
})

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

}


document.getElementById('cadastrar').addEventListener('click', uplodImge)



//Adicionar mais campos de ingresso
const ingresso = document.getElementById('ingresso')
let adicionarIngresso = ingresso.querySelector('.Adicionar')


let bntIngresso = ingresso.querySelector('.bntIngresso')

let removerIngresso = ingresso.querySelector('.Remover')


removerIngresso.addEventListener('click', () => {
    let numeros = ingresso.querySelectorAll('.numeroIngresso')
    let contador = 0
    numeros.forEach(numero => {

        console.log(contador)
        if (numeros.length - 1 == contador) {
            numero.remove()
        }
        contador += 1;
    })

})


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
