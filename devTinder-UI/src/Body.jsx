import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from '../src/utils/userSlice'
import { API_BASE_URL } from './utils/constants'

const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.userReducer)
  const fetchUser=async ()=>{
    if(userData) return
    try {
       const user=await axios.get(API_BASE_URL+"api/profile",{
      withCredentials:true
    })
    dispatch(setUser(user.data))
    
    } catch (error) {
      if(error.response && error.response.status===401){

      
      navigate('/login')
      }
      console.error("Error while fetching user data",error.message);
    }
   
  }
  
  useEffect(()=>{
  

    
    fetchUser()
    
  },[])

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col">

 
  <main className="flex-grow">
    <Outlet /> 
    
  </main>

  
  <Footer />
</div>

    </>
  )
}

export default Body