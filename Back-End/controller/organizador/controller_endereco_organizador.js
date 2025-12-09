/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a Endereço de Organiozadores
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ******************************************************************************************************************/
const organizer_addressDAO = require('../../model/dao/endereco_organizador.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listOrganizersAddresess = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultAdresess = await organizer_addressDAO.getAllOrganizersAddresses()
       
       if(resultAdresess){
            if(resultAdresess != null){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items = resultAdresess

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

const listOrganizerAdresessByAddressID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(id) || id != '' || id > 0){
            let resultAddress = await organizer_addressDAO.getOrganizerAddressByAddressID(id)

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

const listOrganizerAdresessByOrganizerID = async function(organizerID){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(organizerID) || organizerID != '' || organizerID > 0){

            let resultAddress = await organizer_addressDAO.getOrganizerAddressByOrganizerID(organizerID)

            if(resultAddress){

                if(resultAddress.length > 0){
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
            MESSAGES.ERROR_REQUIRED_FIELDS += ' [ID Organizador Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch(error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500(erro interno)
    }
}

const setOrganizerAddress = async function(address, contentType){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
     try{
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateoOrganizerAddress(address)
            if(!validate){
                let resultAddress = await organizer_addressDAO.insertOrganizerAddress(address)

                if(resultAddress){

                    let lastID = await organizer_addressDAO.getLastId()

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

const setUpdateOrganizerAddress = async function(address, id, contentType){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try{
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateOrganizer(address)
            if(!validate){
    
                let validateID = await listOrganizerByID(id)
                if(validateID.status_code == 200){
    
                    address.id = Number(id)
    
                    let resultAddress = await organizerDAO.updateOrganizaer(address)
    
                        if(resultAddress){
    
                            address.id = lastId
    
                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items = address
    
                            return MESSAGES.DEFAULT_HEADER //201
    
                        }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
    
                    }else{
                        return validateID //Referente a validação da função de busca por ID poderá retornar (400 | 404 | 500)
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

module.exports = {
    listOrganizersAddresess,
    listOrganizerAdresessByAddressID,
    listOrganizerAdresessByOrganizerID,
    setOrganizerAddress,
    setUpdateOrganizerAddress
}



// Função para validar todos os dados do endereco enviado
const validateOrganizerAddress = async function(address){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(address.cep == '' || address.cep == undefined || address.cep == null || address.cep.length > 8 ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cep inválido]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.cidade == '' || address.cidade == undefined || address.cidade == null || address.cidade.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cidade incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.bairro == '' || address.bairro == undefined || address.bairro == null || address.bairro.length != 14){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [bairro incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if(address.numero == '' || address.numero == undefined || address.numero == null || address.numero.length > 50){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [numero incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.logradouro == '' || address.logradouro == undefined || address.logradouro == null || address.logradouro.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [logradouro incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.id_uf == undefined || address.id_uf == null || !isNaN(address.id_uf)){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_uf incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(address.id_organizador == undefined || address.id_organizador == null || !isNaN(address.id_organizador)){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_organizador incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }

}


