import React, { useReducer } from 'react'
import axios from 'axios'
import UserContext from './userContext'
import userReducer from './userReducer'
import setAuthToken from '../../utils/setAuthToken'


import {
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_ALERT,
    REMOVE_ALERT
 } from '../types'

 
 const UserState = props => {

     const initialState = {
         isAuthenticated: false,
         user: null,
        //  loading: true
         error: null
     } 

    const [state, dispatch] = useReducer(userReducer, initialState)
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }}

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

 // actions
    const loadUser = async ()=> {    
        try { 
            const res = await axios.get('http://localhost:4000/users/me', config)

            dispatch({ 
                type: USER_LOADED, 
                payload: res.data
            })

        } catch (err) {   
            localStorage.removeItem('token')             
            setAlert(err.response.data.message)           
        }
    }

    const register = async formData =>{
        
        try {
            const res = await axios.post('http://localhost:4000/users', formData, config)

            localStorage.setItem('token', res.data.token)   
            setAuthToken()         
            
            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            })

        } catch (err) {
            setAlert(err.response.data.message)            
        }
    }
 
    const login = async (formData) =>{
        
         try {
            const res = await axios.post('http://localhost:4000/users/login', formData, config)
            localStorage.setItem('token', res.data.token) 
            setAuthToken()
            
            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            setAlert(err.response.data)        
        }
    }

    const logout = async ()=> {
        try {
            await axios.post('http://localhost:4000/users/logout', config)
            localStorage.removeItem('token')
            dispatch({ type: LOGOUT })

        } catch (err) {
            setAlert(err.response.data)           
        }        
    }   

 return (
     <UserContext.Provider
     value={{
         isAuthenticated:state.isAuthenticated,
         user: state.user,
        //  loading: state.loading,
         error: state.error,
         register,
         loadUser,
         login,
         logout
     }}
     >
         {props.children}
     </UserContext.Provider>
 )

}

export default UserState

