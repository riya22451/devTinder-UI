import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './utils/constants';

const Login = () => {
  const [emailId,setemailId]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('')
  const [login,setLogin]=useState(true);
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [photoUrl,setPhotoUrl]=useState('');
  const [about,setAbout]=useState('');
  const[gender,setGender]=useState('');
  const [age,setAge]=useState('');
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const handleLogin=async()=>{
    try {
       const res=await axios.post(API_BASE_URL+'api/auth/login',{
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
  const handleSignup=async()=>{
    try {
      const res=await axios.post(API_BASE_URL+"api/auth/signup",{
        firstName,
        lastName,
        emailId,
        password,
        photoUrl,
        about,
        gender,
        age
      },{withCredentials:true});
      dispatch(setUser(res.data.user))
      setLogin(true)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
 return (
  <div className="min-h-screen flex justify-center items-center bg-base-100 px-4 py-6">

    <div className="card card-border bg-base-200 w-[380px] py-3">
      <div className="card-body">

        <h2 className="card-title text-center mb-2">
          {login ? "Login" : "Sign Up"}
        </h2>

        {/* EMAIL */}
        <fieldset className="fieldset w-full mb-2">
          <legend className="fieldset-legend text-sm">Email Id</legend>
          <input 
            type="text" 
            className="input w-full py-2 text-sm"
            value={emailId}
            onChange={(e)=>setemailId(e.target.value)}
          />
        </fieldset>

        {/* PASSWORD */}
        <fieldset className="fieldset w-full mb-2">
          <legend className="fieldset-legend text-sm">Password</legend>
          <input 
            type="password" 
            className="input w-full py-2 text-sm"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </fieldset>

        {/* SIGNUP FIELDS */}
        {!login && (
          <div className="grid grid-cols-2 gap-3 w-full">

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-sm">First Name</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-sm">Last Name</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-sm">Age</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full col-span-2">
              <legend className="fieldset-legend text-sm">About</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={about}
                onChange={(e)=>setAbout(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full col-span-2">
              <legend className="fieldset-legend text-sm">Photo URL</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={photoUrl}
                onChange={(e)=>setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full col-span-2">
              <legend className="fieldset-legend text-sm">Gender</legend>
              <input 
                type="text" 
                className="input w-full py-2 text-sm"
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
              />
            </fieldset>

          </div>
        )}

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* SWITCH LOGIN / SIGNUP */}
        <p className="mt-2 text-center text-sm">
          {login ? "Not Registered?" : "Already Registered?"} 
          <span 
            className="text-blue-500 cursor-pointer ml-1"
            onClick={()=>setLogin(!login)}
          >
            {login ? "Sign Up" : "Login"}
          </span>
        </p>

        {/* BUTTON */}
        {login ? <button 
          className="btn btn-primary w-full mt-3"
          onClick={handleLogin}
        >
           Login
        </button> : <button 
          className="btn btn-primary w-full mt-3"
          onClick={handleSignup}
        >
        Sign Up
        </button>}
        

      </div>
    </div>

  </div>
);

}

export default Login
