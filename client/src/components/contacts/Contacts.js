import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'
import ContactContext from '../../context/contact/contactContext'
import AlertContext from '../../context/alert/alertContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const alertContext = useContext(AlertContext)
    
    const { contacts, filtered, loading, error, getContacts, clearError } = contactContext
    const { setAlert } = alertContext

    useEffect(() => {
        getContacts();

        if(!contacts && error) {
            setAlert('Could not get contacts', 'danger')
            clearError()
        }
        // eslint-disable-next-line
      }, []);

    if ((contacts === null || contacts.length===0) && !loading) {
        return <h4>Please add a contact</h4>;
    }

    if (filtered) {
        return (
            <Fragment>
                 {loading ? <Spinner /> : (<TransitionGroup>
                    {filtered.map(contact=>(
                        <CSSTransition key={contact._id} timeout={500} classNames='item>'>
                        <ContactItem contact={contact}/>
                        </CSSTransition>
                        ))
                    }
                </TransitionGroup>
                 )}
            </Fragment>
        )
    }

    return (
        <Fragment> 
            {loading ? <Spinner /> : (<TransitionGroup>
                {contacts.map(contact =>(
                        <CSSTransition key={contact._id} timeout={500} classNames='item>'>
                       <ContactItem contact={contact}/>
                       </CSSTransition>
                    ))
                }     
            </TransitionGroup>)
            }                         
        </Fragment>    
    )
}

export default Contacts