import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import ContactContext from '../../context/contact/contactContext'
import propTypes from 'prop-types'

const Navbar = ({title}) => {
  const userContext = useContext(UserContext)
  const { logout, user } = userContext
  const contactContext = useContext(ContactContext)
  const { clearContacts } = contactContext


  const onLogout =()=>{
    logout()
    clearContacts()
  }
  const authLinks = (
    <Fragment>
      <li >Hello, {user && user.name}! </li>
      <li>
      <Link to='/login' onClick={onLogout}> 
          <i  /><span className='hide-sm'>Logout</span>
        </Link>  
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
        <h1>{title}</h1>
        <ul>
         {user ? authLinks : guestLinks }        
        </ul>
    </div>
  )
}

Navbar.propTypes = {
    title: propTypes.string.isRequired
}

Navbar.defaultProps= {
    title: 'Contact Keeper'
}

export default Navbar
