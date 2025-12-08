import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId,setemailId]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const handleLogin=async()=>{
    try {
       const res=await axios.post('http://localhost:3000/api/auth/login',{
      emailId,
      password
       },{withCredentials:true});
       console.log(res.data.user)
       dispatch(setUser(res.data.user))
       navigate('/');
    } catch (error) {

     setError(error.response.data.message)
      
    }
   
  }
  return (
    <div className='flex justify-center mt-10 '>
      <div className="card card-border bg-base-200 w-96 py-2">
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title">Login</h2>

          <fieldset className="fieldset w-full py-4">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" className="input w-full py-6" value={emailId} onChange={(e)=>setemailId(e.target.value)} placeholder="Type here" />
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" className="input w-full py-6" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Type here" />
          </fieldset>
           {error && <p className='text-red-500'>{error}</p>}
          <div className="card-actions justify-center mt-2 w-full">
            <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
