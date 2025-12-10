import React from 'react'
import { useDispatch } from 'react-redux'
import { clearFeed } from './utils/feedSlice'
import axios from 'axios'
const UserCard = ({firstName,lastName,photoUrl,about,userId}) => {
  const dispatch=useDispatch()
    const handleRequest=async(status,userId)=>{
        try {
          const res=await axios.post('http://localhost:3000/api/connection/request/send/'+status+'/'+userId,{},{withCredentials:true})
          dispatch(clearFeed(userId))
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
  return (
   <div className="card bg-base-200 w-80 shadow-sm mt-4 ml-4 h-[580px]">
  <figure>
    <img
    className='w-full h-80 object-cover p-4 rounded-lg '
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center mt-4">
      <button className="btn btn-primary" onClick={()=>handleRequest('ignore',userId)}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleRequest('interested',userId)}>Interested</button>
    </div>
  </div>
</div>
  )
 
  
  
}

export default UserCard