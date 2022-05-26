import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactFilter from '../contacts/ContactFilter'
import UserContext from '../../context/user/userContext'


const Home = () => {
  
  const userContext = useContext(UserContext)
  const { user, isAuthenticated, loadUser } = userContext

  const navigate = useNavigate()
  
  
  useEffect(()=>{
    if(!user){
      loadUser() 
    }
    
    if(!isAuthenticated){
      navigate('/login')
    } 
   // eslint-disable-next-line 
  }, [isAuthenticated])

  return (
    <div className='grid-2'>
      <div>
        < ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>

    </div>
  )
}

export default Home
