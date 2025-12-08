import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from '../src/utils/userSlice'

const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.userReducer)
  const fetchUser=async ()=>{
    if(userData) return
    try {
       const user=await axios.get('http://localhost:3000/api/profile',{
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
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body