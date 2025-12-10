/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a UF 
 * Data: 27/11/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/
/***********************************************************************************************************
 * Objetivo: Verificar e corrigir o funcionamento funções
 * Data: 03/12/2025
 * Autor: Breno
 * Versão: 1.0
 ***********************************************************************************************************/
const statsDAO = require('../../model/dao/status_evento.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listStats = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultStats = await statsDAO.getAllEventStats()
       
       if(resultStats){
            if(resultStats != null && resultStats.length>0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.status = resultStats

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

const listStatsByID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultStats = await statsDAO.getEventStatsByID(id)

            if(resultStats){

                if(resultStats != null && resultStats.length>0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.status = resultStats

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
    listStats,
    listStatsByID
}
