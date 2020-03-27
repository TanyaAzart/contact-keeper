import React, { useReducer} from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR    
} from '../types'

const AuthState = props => {
    const initialState = {
        token: null,
        isAuthenticated: null,
        user: null,
        loading: true,
        error: false
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    
     // Load user
     const loadUser = async ()=>{
        
        setAuthToken(localStorage.token)
        
        try {
            const res = await axios.get('/api/auth')     
            
            dispatch ({
                type: USER_LOADED, 
                payload: res.data})
        } catch (err) {            
           dispatch({type:AUTH_ERROR })
        }
    }

    //Register user
    const register = async formData =>{
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config)
            dispatch({ type: REGISTER_SUCCESS, payload: res.data})
            
            loadUser()
        } catch (err){
            dispatch({type: REGISTER_FAIL })
        }
    }

    //Login user
    const login = async formData =>{
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data})
            
            loadUser()
        } catch (err){                        
            dispatch({type: LOGIN_FAIL })
        }
    }
   //Logout user 
   const logout = () => dispatch({type: LOGOUT})
   
    //clear errors
    const clearError = ()=>{
        dispatch({type: CLEAR_ERROR})
    }


return <AuthContext.Provider 
value = {{
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,
    loadUser,
    register,
    login,
    logout,
    clearError
}}>
    { props.children }
</AuthContext.Provider>
}

export default AuthState
