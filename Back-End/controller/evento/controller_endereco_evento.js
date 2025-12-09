/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a Endereço dos Eventos
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ******************************************************************************************************************/
const event_addressDAO = require('../../model/dao/endereco_evento.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listEventsAddresess = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultAdresess = await event_addressDAO.getAllEventsAddresses()
       
       if(resultAdresess){
            if(resultAdresess != null){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.item = resultAdresess

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

const listEventAdresessByAddressID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Validação do ID
        if(!isNaN(id) || id != '' || id > 0){
            let resultAddress = await event_addressDAO.getEventAddressByAddressID(id)
            

            if(resultAddress){

                if(resultAddress != null){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.item = resultAddress

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch(error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const listEventAdresessByEventID = async function(eventID){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(eventID) || eventID != '' || eventID > 0){

            let resultAddress = await event_addressDAO.getEventAddressByEventID(eventID)

            if(resultAddress){

                if(resultAddress != null){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items = resultAddress

                    return MESSAGES.DEFAULT_HEADER //200(sucesso)
                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404(não encontrado)
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500(erro interno)
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS += ' [ID Evento Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch(error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const setEventAddress = async function(address, contentType){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
     try{
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateEventAddress(address)
            if(!validate){
                let resultAddress = await event_addressDAO.insertEventAddress(address)

                if(resultAddress){

                    let lastID = await event_addressDAO.getLastId()

                    if(lastID){
                        address.id = lastID

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = address

                        return MESSAGES.DEFAULT_HEADER

                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            }else{
                return validate
            }

        }else{
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const setUpdateEventAddress = async function(address, id, contentType){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try{
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateEventAddress(address)
            if(!validate){
    
    
                address.id = Number(id)
    
                let resultAddress = await event_addressDAO.updateEventAddress(address)
                
                    if(resultAddress){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = address
    
                        return MESSAGES.DEFAULT_HEADER //201
    
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
    
            }else{
                return validate //400 Referente a  validação dos dados
            }
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    
    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}




// Função para validar todos os dados do endereco enviado
const validateEventAddress = async function(address){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(address.cep == '' || address.cep == undefined || address.cep == null || address.cep.length > 8 ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cep inválido]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.cidade == '' || address.cidade == undefined || address.cidade == null || address.cidade.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cidade incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.bairro == '' || address.bairro == undefined || address.bairro == null || address.bairro.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [bairro incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if(address.numero == '' || address.numero == undefined || address.numero == null || address.numero.length > 50){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [numero incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.logradouro == '' || address.logradouro == undefined || address.logradouro == null || address.logradouro.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [endereco incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.id_uf == '' || address.id_uf == undefined || address.id_uf == null || isNaN(address.id_uf) || address.id_uf <= 0 ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_uf incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.id_evento == '' || address.id_evento == undefined || address.id_evento == null || isNaN(address.id_evento) || address.id_evento <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_evento incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }

}

module.exports = {
    listEventsAddresess,
    listEventAdresessByAddressID,
    listEventAdresessByEventID,
    setEventAddress,
    setUpdateEventAddress
}