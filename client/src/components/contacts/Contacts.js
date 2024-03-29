import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layouts/Spinner'

const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const { contacts, filtered, loading, getContacts } = contactContext

    useEffect(()=>{
      getContacts()
      // eslint-disable-next-line
    }, [contacts])

    if(contacts.length===0) {
      return (<h4>Please add a contact</h4>)
    }

  return (
    <Fragment>
      {loading? <Spinner /> : <TransitionGroup>
        {filtered.length !==0 ? filtered.map(contact=> 
        <CSSTransition key={contact._id} timeout={500} classNames='item'>
          <ContactItem contact={contact} />
        </CSSTransition>)  : contacts.map(contact => 
          <CSSTransition key={contact._id} timeout={500} classNames='item'>
            <ContactItem contact={contact}/>
          </CSSTransition>)
        }      
        </TransitionGroup> }      
               
    </Fragment>
  )
}

export default Contacts
