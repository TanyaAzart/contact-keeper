import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import ContactState from './context/contact/ContactState'
import UserState from './context/user/userState'

import setAuthToken from './utils/setAuthToken'
import './App.css';

const App = ()=> {

  setAuthToken()

  return (
    <UserState >
      <ContactState>
          <Router >
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alert />
                <Routes>
                  <Route exact path='/' element={<Home />}/>
                  <Route exact path='/about' element={ <About />}/>
                  <Route exact path='/register' element={ <Register />}/>
                  <Route exact path='/login' element={ <Login />}/>
                </Routes>
              </div>      
            </Fragment>
          </Router>
      </ContactState> 
    </UserState> 
  );
}

export default App;
