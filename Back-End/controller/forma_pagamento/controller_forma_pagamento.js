/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a formas de pagamento
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/

const formaPagamentoDAO = require('../../model/dao/forma_pagamento')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listPayments = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultFormaPagamento = await formaPagamentoDAO.getAllPayments()
       
       if(resultFormaPagamento){
            if(resultFormaPagamento != null && resultFormaPagamento.length>0){
                MESSAGES.DEFAULT_HEADER.development = 'Breno Oliveira Assis Reis'
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.forma_pagamento = resultFormaPagamento

                return MESSAGES.DEFAULT_HEADER //200(sucesso)
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
            }
       }else{
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
       }

    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const listPaymentsByID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultFormaPagamento = await formaPagamentoDAO.getPaymentsByID(id)

            if(resultFormaPagamento){

                if(resultFormaPagamento != null && resultFormaPagamento.length>0){
                    MESSAGES.DEFAULT_HEADER.development = 'Breno Oliveira Assis Reis'
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.forma_pagamento = resultFormaPagamento

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch(error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

module.exports = {
    listPayments,
    listPaymentsByID
}
