import { Routes, Route, Navigate } from 'react-router-dom';
import {useContext} from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile';

import AuthContext from './store/authContext'


const App = () => {
  const {state}= useContext(AuthContext);
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={state.token? <Navigate to='/' />:<Auth/>}/>
        <Route path='/form' element={!state.token? <Navigate to='/auth' />:<Form/>}/>
        <Route path='/profile' element={state.token ?<Profile/> : <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App
