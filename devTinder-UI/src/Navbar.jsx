import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from './utils/userSlice'

const Navbar = () => {
  const selector=useSelector((store)=>store.userReducer)
  const dispatch=useDispatch()
  const userData=useSelector((store)=>store.userReducer)
  const navigate=useNavigate()
  const logOut=async ()=>{
      if(!userData) return
     const res=await axios.post('http://localhost:3000/api/auth/logout',{},{withCredentials:true})
     if(res.status==200){
      dispatch(removeUser())
      navigate('/login')
     }

  }
  return (
     <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {selector ? 
    <div className="dropdown dropdown-end mx-5 flex  gap-2">
      <p>Welcome {selector.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className=" w-10 rounded-full "  >
          <img
          
            alt="Tailwind CSS Navbar component"
            src={selector.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={logOut}>Logout</a></li>
      </ul>
    </div>
    : <></>
}
  </div>
</div>
  )
}

export default Navbar