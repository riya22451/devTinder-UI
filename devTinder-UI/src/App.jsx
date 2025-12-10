import React from 'react'
import Navbar from './Navbar.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './Body.jsx'
import Login from './Login.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import Feed from './Feed.jsx'
import Profile from './Profile.jsx'
import Connections from './Connections.jsx'
import Requests from './Requests.jsx'
const App = () => {
  return (
  <>
  <Provider store={appStore}>
   <BrowserRouter basename='/'>
   <Routes>
    <Route path='/' element={<Body/>}>
    <Route path='/' element={<Feed/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/connections' element={<Connections/>}/>
    <Route path='/requests' element={<Requests/>}/>
    </Route>
    
   </Routes>
   </BrowserRouter>
   </Provider>
  </>
  )
}

export default App