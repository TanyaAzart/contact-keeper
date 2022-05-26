import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
 } from '../types'

const contactReducer = (state, action)=>{
     switch (action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            } 
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: []
            }
        case ADD_CONTACT:
             return {
                 ...state,
                 contacts: [action.payload, ...state.contacts],
                 current: null,
                 loading: false
             }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact=> 
                    contact._id === action.payload._id ? action.payload : contact),
                current: null,
                loading: false
            }

        case DELETE_CONTACT:
              return {
                  ...state,
                  contacts: state.contacts.filter(contact => contact._id !== action.payload),
                  loading: false
              }  
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
 
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => 
                    contact.name.toLowerCase().includes(action.payload.toLowerCase()))
                }
        case CLEAR_FILTER:
             return {
                 ...state,
                 filtered: []
             }
        case SET_ALERT:
        return {
            ...state,
            error: action.payload,
            loading: false
        }
        case REMOVE_ALERT:
            return {
                ...state,
                error: null
            }
        default:
             return state
     }

 }

 export default contactReducer