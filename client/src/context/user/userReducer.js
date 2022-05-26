import {
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const userReducer = (state, action)=> {
    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }
        case SET_ALERT:
            return {
                ...state,
                error: action.payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                error: null
            }

        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default userReducer