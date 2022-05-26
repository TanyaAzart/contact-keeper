import React, { useContext } from 'react'
import UserContext from '../../context/user/userContext'
import ContactContext from '../../context/contact/contactContext'

const Alert = () => {
    const userContext = useContext(UserContext)
    const contactContext = useContext(ContactContext) 

    const userError = userContext.error
    const contactError = contactContext.error

    const error = userError || contactError

    
    return (error && (
        <div className='alert alert-danger'>
        <i className='fas fa-exclamation-triangle' />{` ${error}`}
    </div>
      ))
    
}

export default Alert