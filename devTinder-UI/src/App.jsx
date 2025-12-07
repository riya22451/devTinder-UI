import React from 'react'
import Navbar from './Navbar.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './Body.jsx'
import Login from './Login.jsx'
const App = () => {
  return (
  <>
  
   <BrowserRouter basename='/'>
   <Routes>
    <Route path='/' element={<Body/>}>
    <Route path='/login' element={<Login/>}/>
    </Route>
    
   </Routes>
   </BrowserRouter>
  </>
  )
}

export default App