'use strict'

import {uploadImageToAzure} from "./uploadAzure.js"
// //Criando uma Váriavel para guardar todas as categorias
// const itensCategoria = document.querySelectorAll('.item-categoria')

// //Mudar cor da categoria quando for clicada
// itensCategoria.forEach(item => {
//     let cor = true
//     item.classList.add('cor-item-padrao')

//     item.addEventListener('click', () => {
//         if (cor) {
//             item.classList.remove('cor-item-padrao')
//             item.classList.add('cor-item-click')
//             cor = false
//         } else {
//             item.classList.remove('cor-item-click')
//             item.classList.add('cor-item-padrao')
//             cor = true
//         }

//     })
// })

// //Adicionar mais campos de ingresso
// const ingresso = document.getElementById('ingresso')
// let adicionarIngresso = ingresso.querySelector('.Adicionar')

// adicionarIngresso.addEventListener('click', () => {

// })

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


async function uplodImge() {
    const uploadParams = {
        storageAccount: 'uploadgestao',
        containerName: 'gestao-evento',
        file: inputFoto.files[0],
        sasToken:'sp=racwl&st=2025-12-14T22:40:51Z&se=2025-12-19T06:55:51Z&sv=2024-11-04&sr=c&sig=EqQEXnwHo3y0bIpUoOWTF5xyAEiNCSdioRX7Z2qlhhM%3D'
    }
    await uploadImageToAzure(uploadParams)
}

console.log(inputFoto )

document.getElementById('cadastrar').addEventListener('click',uplodImge)





// //Adicionar mais campos para setor
// const setor = document.getElementById('setor')

// let adicionarSetor = setor.querySelector('.Adicionar')

// // adicionarSetor.addEventListener('click', () => {

// //     const nomeSetor = document.createElement('div')
// //     nomeSetor.classList.add('nomeSetor')
// //     nomeSetor.classList.add('input-box')

// //     const inputSetor = document.createElement('input')
// //     inputSetor.classList.add('InputSetor')

// //     inputSetor.type = 'text';
// //     inputSetor.placeholder = 'Nome setor'
// //     inputSetor.required = true;



// //     nomeSetor.append(inputSetor)

// //     const capacidadeSetor = document.createElement('div')
// //     capacidadeSetor.classList.add('capacidadeSetor')
// //     capacidadeSetor.classList.add('input-box')

// //     const inputCapacidade = document.createElement('input')
// //     inputCapacidade.classList.add('InputSetor')


// //     inputCapacidade.type = 'text';
// //     inputCapacidade.placeholder = 'Capacidade';
// //     inputCapacidade.required = true;

// //     capacidadeSetor.append(inputCapacidade)

// //     const capacidadeAtualSetor = document.createElement('div')
// //     capacidadeAtualSetor.classList.add('capacidadeAtualSetor')
// //     capacidadeAtualSetor.classList.add('input-box')

// //     const inputCapacidadeAtual = document.createElement('input')
// //     inputCapacidadeAtual.classList.add('InputSetor')

// //     inputCapacidadeAtual.type = 'text';
// //     inputCapacidadeAtual.placeholder = 'Capacidade Atual';
// //     inputCapacidadeAtual.required = true;

// //     capacidadeAtualSetor.append(inputCapacidadeAtual)

// //     setor.append(nomeSetor, capacidadeSetor, capacidadeAtualSetor)

// //     // setor.querySelector('.Adicionar').remove()

// //     // const adicionar = document.createElement('div')

// //     // adicionar.classList.add('Adicionar')

// //     // adicionar.textContent = '+'

// //     // adicionar.addEventListener('click',()=>{

// //     // })

// //     // setor.appendChild(adicionar)


// // })
// console.log(adicionar)
