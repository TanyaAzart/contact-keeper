import React, { useState , useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext )
    const { addContact, clearCurrent, updateContact, current } = contactContext

    useEffect(()=>{
        if(current !==null) {
            setContact(current)
        } else {
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })
        }
    }, [current])

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    })

    const {name, email, phone, type } = contact

    const onChange = e => {
        setContact(        
            {...contact, [e.target.name]:e.target.value
        })    
    }

    const onSubmit = e => {
        e.preventDefault()
        document.querySelector('#myform').reset()
        if(current===null){
            addContact(contact)        
            
        } else {
            updateContact(contact)
        }
    }

  return (
    <form id='myform' onSubmit = {onSubmit}>
        <h2 className='text-primary'>{current ? 'Update contact' : 'Add contact'}</h2>
        <input 
            type='text' 
            placeholder='Name' 
            name='name' 
            value={name}
            onChange={onChange}
        />
        <input 
            type='text' 
            placeholder='Email' 
            name='email' 
            value={email}
            onChange={onChange}
        />
        <input 
            type='text' 
            placeholder='Phone' 
            name='phone' 
            value={phone}
            onChange={onChange}
        />
        <input 
            type='radio' 
            name='type' 
            value='personal' 
            checked={type==='personal'}
            onChange={onChange}
            />Personal {' '}
        <input 
            type='radio' 
            name='type' 
            value='professional' 
            checked={type==='professional'}
            onChange={onChange}
            />Professional
        <div>
            <input 
                type='submit' 
                value={current ? 'Update contact' : 'Add contact'}
                className='btn btn-block btn-primary'/>
            </div>  
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearCurrent}>Clear</button>
            </div>
            }
            
    </form>
  )
}

export default ContactForm