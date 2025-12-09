/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre APP e MODEL referente a Evento
 * Data: 09/12/2025
 * Autor: Enzo Carrilho
 * Versão: 1.0
 ***********************************************************************************************************/
const eventDAO = require('../../model/dao/evento.js')
const controllerEventAddress = require('./controller_endereco_evento.js')
const DEFAULT_MESSAGES = require('../modulo/response_messages.js')

const listEvents = async function(){
    //Criando objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       let resultEvents = await eventDAO.getAllEvents()
              
       if(resultEvents){
            if(resultEvents.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items = resultEvents

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

const listEventByID = async function(id){
    //Criando um objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do ID
        if(!isNaN(id) || id != '' || id > 0){
            let resultEvent = await eventDAO.getEventById(id)
            
            if(resultEvent){

                if(resultEvent.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items = resultEvent

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

const setEvent = async function(evento, contentType){
     //Criando um objeto para as mensagens
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            if(evento.endereco){
                //Guarda os dados do endereço do Organizador e remove do JSON Organizador
                const eventAddress = evento.endereco
                delete evento.endereco

                //Guarda o resultado da validação de dados do Organizador
                let validate = await validateEvent(evento)

                if(!validate){
                    let resultOrganizer = await eventDAO.insertEvent(evento)

                    if(resultOrganizer){

                        let lastId = await eventDAO.getLastId()

                        if(lastId){
                            evento.id = lastId
                            //Adiciona o ID do Organizador no Endereco para ser cadastrado com FK
                            eventAddress.id_evento = lastId

                            //Chama a função da controller para validar o Endereco do Organizador e enviar para a model
                            const resultAddress = await controllerEventAddress.setEventAddress(eventAddress, contentType)
                            
                                if(resultAddress.status != false){
                                    //Adiciona o Endereço cadastrado no Evento para retorno
                                    evento.endereco = resultAddress.items

                                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                                    MESSAGES.DEFAULT_HEADER.items = evento

                                    return MESSAGES.DEFAULT_HEADER
                                }else{
                                    return resultAddress
                                }

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
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Endereco Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
         }else{
            return MESSAGES.ERROR_CONTENT_TYPE
         }

     }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
     }
}

const setUpdateEvent = async function(evento, id, contentType){
    //Criando um objeto para as mensagens
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

     try{
         //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
         if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            if(evento.endereco){
                //Guarda os dados do endereço do Organizador e remove do JSON Organizador
                const eventAddress = evento.endereco
                eventAddress.id_evento = Number(id)
                delete evento.endereco
                
                //Guarda o resultado da validação de dados do Organizador
                let validate = await validateEvent(evento)
                if(!validate){

                    let validateID = await listEventByID(id)
                    if(validateID.status_code == 200){

                        evento.id = Number(id)

                        let resultEvent = await eventDAO.updateEvent(evento)

                        if(resultEvent){
                            
                            const validateAddressID = await controllerEventAddress.listEventAdresessByEventID(id)
                            const addressID = validateAddressID.items[0].id
                            

                            const resultAddress = await controllerEventAddress.setUpdateEventAddress(eventAddress, addressID, contentType)

                                if(resultAddress || resultAddress.status != false){
                                    evento.endereco = resultAddress.items
                                        
                                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                                        MESSAGES.DEFAULT_HEADER.items = evento

                                        return MESSAGES.DEFAULT_HEADER //201

                                }else{
                                    return resultAddress
                                }

                           
 
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
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Endereco Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }

            
         }else{
            return MESSAGES.ERROR_CONTENT_TYPE //415
         }

     }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
     }
}


const setDeleteEvent = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        let validarId = await listEventByID(id)
        
        
        if(validarId.status_code == 200){
                
            let resultEvent = await eventDAO.deleteEvent(Number(id))
           
    
            if(resultEvent){
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
    listEvents,
    listEventByID,
    setEvent,
    setUpdateEvent,
    setDeleteEvent
}


// Função para validar todos os dados do organizador enviado
const validateEvent = async function(evento){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(evento.nome == '' || evento.nome == undefined || evento.nome == null || evento.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [nome incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(evento.descricao == '' || evento.descricao == undefined || evento.descricao == null || evento.descricao.length > 500){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [descricao incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(evento.data == undefined || evento.data.length != 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [data inválida]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    else if(evento.capa_url == '' || evento.capa_url == undefined || evento.capa_url == null || evento.capa_url.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [capa_url incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(evento.id_organizador <= 0 || isNaN(evento.id_organizador)  || evento.id_organizador == null || evento.id_organizador.length == '' || evento.id_organizador == undefined ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [telefone incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400

    }else if(evento.id_status_evento == '' || evento.id_status_evento == undefined || evento.id_status_evento == null || evento.id_status_evento <= 0 || isNaN(evento.id_status_evento) ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [senha incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    }
    
}