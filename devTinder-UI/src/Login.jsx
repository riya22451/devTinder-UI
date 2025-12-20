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
       return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message || 'Signup failed')
    }
  }
 return (
  <div className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

    <div className="w-full max-w-md bg-slate-800/90 backdrop-blur 
                    border border-slate-700 rounded-2xl shadow-2xl p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        {login ? "Welcome Back 👋" : "Create Account"}
      </h2>
      <p className="text-center text-gray-400 mb-6 text-sm">
        {login
          ? "Login to continue matching"
          : "Join DevTinder and start connecting"}
      </p>

      {/* EMAIL */}
      <div className="mb-3">
        <label className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          className="input input-bordered w-full mt-1 bg-slate-900 border-slate-700 text-white"
          value={emailId}
          onChange={(e) => setemailId(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="mb-3">
        <label className="text-sm text-gray-300">Password</label>
        <input
          type="password"
          className="input input-bordered w-full mt-1 bg-slate-900 border-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* SIGNUP EXTRA FIELDS */}
      {!login && (
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered bg-slate-900 border-slate-700 text-white"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered bg-slate-900 border-slate-700 text-white"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Age"
            className="input input-bordered bg-slate-900 border-slate-700 text-white"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender"
            className="input input-bordered bg-slate-900 border-slate-700 text-white"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered col-span-2 bg-slate-900 border-slate-700 text-white"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <textarea
            placeholder="About you"
            className="textarea textarea-bordered col-span-2 bg-slate-900 border-slate-700 text-white"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
      )}

      {/* BUTTON */}
      <button
        className="btn btn-primary w-full mt-5"
        onClick={login ? handleLogin : handleSignup}
      >
        {login ? "Login" : "Sign Up"}
      </button>

      {/* SWITCH */}
      <p className="text-center text-sm text-gray-400 mt-4">
        {login ? "New to DevTinder?" : "Already have an account?"}
        <span
          className="text-indigo-400 cursor-pointer ml-1 hover:underline"
          onClick={() => setLogin(!login)}
        >
          {login ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  </div>
);



}

export default Login
