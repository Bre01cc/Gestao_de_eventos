/*****************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre Evento e Categoria
 * Data: 06/12/2025
 * Autor: Enzo
 * Versão: 1.0
 *****************************************************************************************************************************/
//Import do model da DAO do genero
const eventCategoryDAO = require('../../model/dao/categoria_evento.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listEventsCategorys = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultEventCategory = await eventCategoryDAO.getllEventsCategorys() 

        if(resultEventCategory){
            if(resultEventCategory.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.eventos_categorias = resultEventCategory

                return MESSAGES.DEFAULT_HEADER //200
            }else{
                return MESSAGES.ERROR_NOT_FOUND//404
            }

        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const searchEventCategoryID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultEventCategory = await eventCategoryDAO.getEventsCategorysByID(Number(id))

            if(resultEventCategory){

                if(resultEventCategory.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.evento_categoria = resultEventCategory

                    return MESSAGES.DEFAULT_HEADER //200

                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna as categorias de um evento pelo ID do Evento
const listCategorysByEventID = async function(idEvent){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(idEvent) && idEvent != '' && idEvent > 0){
            let resultEventCategory = await eventCategoryDAO.getCategorysByEventID()

            if(resultEventCategory){

                if(resultEventCategory.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.evento_categoria = resultEventCategory

                    return MESSAGES.DEFAULT_HEADER //200

                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna Evento Filtrando por Categoria
const listEventsByCategoryID = async function(idCategoria){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(idCategoria) && idCategoria != '' && idCategoria > 0){
            let resultEventCategory = await eventCategoryDAO.getEventsByCategoryID()

            if(resultEventCategory){

                if(resultEventCategory.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.evento_categoria = resultEventCategory

                    return MESSAGES.DEFAULT_HEADER //200

                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const setInsertEventCategory = async function(eventCategory, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){


        let validar = await validarDadosFilmeGenero(eventCategory)
       

        //Validação da entrada de dados
        if(!validar){

            let resultEventCategory = await eventCategoryDAO.insertEventCategory(eventCategory)
            
            //Adicionar Filme no retorno
            if(resultEventCategory){

                let lastId = await eventCategoryDAO.getLastId()
                
                if(lastId){
                    eventCategory.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = eventCategory

                    return MESSAGES.DEFAULT_HEADER

                }else{
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }            
                return MESSAGES.DEFAULT_HEADER //201
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
           
        }else{
            return validar
            
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }

}

const setUpdateEventCategory = async function (eventCategory, id, contentType){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = validarDadosFilmeGenero(eventCategory)

        //Validação da entrada de dados
        if(!validar){

            let validarID = await searchEventCategoryID(id)

            if(validarID.status_code == 200){

                eventCategory.id = Number(id)

                let resultEventCategory = await eventCategoryDAO.updateEventCategory(eventCategory)

                //Adicionar Evento no retorno
                if(resultEventCategory){

                    let lastId = await filmeGeneroDAO.getSelectLastId()
                    
                    if(lastId){
                        
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.evento_categoria = eventCategory

                        return MESSAGES.DEFAULT_HEADER
                    }else{
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }            
                    return MESSAGES.DEFAULT_HEADER //201
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validarID
            }
           
        }else{
            return validar
            
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }      

}

module.exports = {
    listEventsCategorys,
    searchEventCategoryID,
    listCategorysByEventID,
    listEventsByCategoryID,
    setInsertEventCategory,
    setUpdateEventCategory
}



const validarDadosFilmeGenero = async function(eventCategory) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(eventCategory.id_evento <= 0 || isNaN(eventCategory.id_evento) || eventCategory.id_evento == '' || eventCategory.id_evento == undefined || eventCategory.id_evento == null){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [filme_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

        
    }else if(eventCategory.id_categoria <= 0 || isNaN(eventCategory.id_categoria) || eventCategory.id_categoria == '' || eventCategory.id_categoria == undefined || eventCategory.id_categoria == null){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [genero_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }   
}