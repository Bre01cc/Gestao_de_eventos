/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a Organiozador
 * Data: 01/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/
const organizerDAO = require('../../model/dao/organizador.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listOrganizers = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultOrganizers = await organizerDAO.getAllOrganizers()
       
       if(resultOrganizers){
            if(resultOrganizers != null){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.item = resultOrganizers

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

const listOrganizerByID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(id) || id != '' || id > 0){
            let resultOrganizer = await statsDAO.getEventStatsByID(id)

            if(resultOrganizer){

                if(resultOrganizer != null){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.item = resultOrganizer

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

const setOrganizer = async function(organizador, contentType){
     //Criando um objeto para as mensagens
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

     try{
         //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
         if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateOrganizer(organizador)
            if(!validate){
                let resultOrganizer = await organizerDAO.insertOrganizer(organizador)

                if(resultOrganizer){

                    let lastId = await organizerDAO.getLastId()

                    if(lastId){
                        organizador.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = organizador

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

const setUpdateOrganizer = async function(organizador, id, contentType){
     //Criando um objeto para as mensagens
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

     try{
         //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
         if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Guarda o resultado da validação de dados do Organizador
            let validate = await validateOrganizer(organizador)
            if(!validate){

                let validateID = await listOrganizerByID(id)
                if(validateID.status_code == 200){

                    organizador.id = Number(id)

                    let resultOrganizer = await organizerDAO.updateOrganizaer(organizador)

                    if(resultOrganizer){

                        organizador.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = organizador

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


const setDeleteOrganizer = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        let validarId = await buscarProdutoraID(id)
        
        if(validarId.status_code == 200){
                
            let resultOrganizer = await organizerDAO.deleteOrganizer(Number(id))
           
    
            if(resultOrganizer){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                    
                return MESSAGES.DEFAULT_HEADER //200
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
                }
    
            }else{
                return validarId
            }
    
        } catch (error) {
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

module.exports = {
    listOrganizers,
    listOrganizerByID,
    setOrganizer,
    setUpdateOrganizer,
    setDeleteOrganizer
}


// Função para validar todos os dados so evento enviado
const validateOrganizer = async function(organizador){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(organizador.nome_fantasia == '' || organizador.nome_fantasia == undefined || organizador.nome_fantasia == null || organizador.nome_fantasia.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [nome_fantasia incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(organizador.razao_social == '' || organizador.razao_social == undefined || organizador.razao_social == null || organizador.razao_social.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [razao_social incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(organizador.cnpj == '' || organizador.cnpj == undefined || organizador.cnpj == null || organizador.cnpj.length != 14){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cnpj incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if(organizador.email == '' || organizador.email == undefined || organizador.email == null || organizador.email.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [email incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(organizador.telefone == '' || organizador.telefone == undefined || organizador.telefone == null || organizador.telefone.length > 20){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [telefone incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(organizador.senha == '' || organizador.senha == undefined || organizador.senha == null || organizador.senha.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [senha incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }

}