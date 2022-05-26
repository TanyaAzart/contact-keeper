import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'


const Login = () => {
    const userContext = useContext(UserContext)
    const { login, isAuthenticated } = userContext  

    const navigate = useNavigate();

    useEffect(()=> {
        if(isAuthenticated) {
            navigate('/')
        }
    //     eslint-disable-next-line
    }, [isAuthenticated])


    const [user, setUser] = useState ({
        email: '',
        password: ''
    })

    const { email, password } = user

    const onChange = e => setUser({...user, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        login({ email, password })
    }

  return (
    <div className='form-container'>
        <h1>Account <span className='text-primary'>Login</span></h1>
        <form onSubmit ={onSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={onChange} required/>
            </div>
            <input type='submit' value='Login' className='btn btn-primary btn-block'/>
        </form>
    </div>
  )
}

export default Login