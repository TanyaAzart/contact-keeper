import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,    
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
 } from '../types'

    const ContactState = props => {

        const initialState = {
            contacts: [],
            current: null,
            filtered: [],
            error: null,
            loading: true
        } 

    const [state, dispatch] = useReducer(contactReducer, initialState)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const setAlert =(msg)=>{    
        dispatch({
            type: SET_ALERT,
            payload: msg 
        })
        setTimeout(()=> {
            dispatch({
                type: REMOVE_ALERT
            })    
        }, 5000)
    }


    // Add contact
    const addContact = async contact => {
        try {
            const res = await axios.post('http://localhost:4000/contacts', contact, config)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            const msg = err.response.data
            if (msg.includes('duplicate key error')) {
                setAlert('Contact already exists!')
            } else {
                setAlert(err.response.data)            
            }
        }
    }

    const updateContact = async contact => {
      
        try {
            const res = await axios.patch(`http://localhost:4000/contacts/${contact._id}`, contact, config)
            
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {
            setAlert(err.response.data.message)           
        }       
    }

    const deleteContact = async id=> {      
        try {
            await axios.delete(`http://localhost:4000/contacts/${id}`)
            
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch(err) {
            setAlert(err.response.data.message)
        }        
    }

    const getContacts = async () => {
    try {
        const res = await axios.get('http://localhost:4000/contacts')
        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        })
    } catch (err) {    
        setAlert(err.response.data)   
    }
    }

    const clearContacts = ()=>{
        dispatch({
            type: CLEAR_CONTACTS
        })
    }   

    const setCurrent =(contact)=> {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    const clearCurrent =()=> {        
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    const filterContacts = (text)=> {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    const clearFilter =()=> {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getContacts,
            clearContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
        >
        {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState

