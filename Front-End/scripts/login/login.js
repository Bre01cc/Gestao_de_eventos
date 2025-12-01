'use strict'

<div class="mensagem-erro" id="mensagem-erro">
<div class="caixa-erro">
    <div class="texto-mensagem-erro">
        <div class="mensagem-erro-text">
            <p>Usuário ou Senha não correspondem!</p>
        </div>
    </div>
    <button class="bnt-erro" id="bnt-erro">
        <p>OK</p>
    </button>
</div>
</div>

const carregarHeader = ()=>{
    const mensagemErro = document.createElement('div')
    mensagemErro.classList.add('mensagem-erro')

    const caixaErro = document.createElement.add('div')
    caixaErro.classList.add('caixa-erro')

    mensagemErro.append(caixaErro)

    const textoMensagemErro = document.createElement('div')
    textoMensagemErro.classList.add('texto-mensagem-erro')

    const bntErro = document.createElement('button')

}
const mensagemErro = document.getElementById('mensagem-erro')
mensagemErro.classList.add('disable');

document.getElementById('bnt-erro').addEventListener('click', () => {
    mensagemErro.classList.remove('active');
    mensagemErro.classList.add('disable');
})

document.getElementById('acessar').addEventListener('click', () => {
    mensagemErro.classList.remove('disable');
    mensagemErro.classList.add('active');
})




