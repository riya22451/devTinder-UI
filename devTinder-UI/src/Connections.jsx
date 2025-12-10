import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConnections } from './utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch()
    const connection=useSelector((store)=>store.connections)
 const fetchConnections=async()=>{
    try {
         const res=await axios.get("http://localhost:3000/api/user/connections",{withCredentials:true})
    console.log(res.data.connections)
    dispatch(setConnections(res.data.connections))
    } catch (error) {
        console.log(error)
    }
   
 }
 useEffect(()=>{
    fetchConnections()
 },[])
 if(!connection) return;
 if(connection.length==0){
    return(
        <div className='flex flex-col justify-center items-center my-10'>
        <h1 className='text-3xl font-bold my-5'>Connections</h1>
        <p className='text-lg'>You have no connections yet.</p>
        </div>
    )
 }
  return (
    <>
    <div className='flex justify-center my-10'>
        <h1 className='text-3xl font-bold my-5'>Connections</h1>
        </div>
       {connection.map((conn) => (
  <div 
    key={conn._id} 
    className="card w-80 bg-base-200 shadow-xl m-5 p-4"
  >
    <figure className="px-4 pt-4">
      <img
        src={conn.photoUrl || "https://via.placeholder.com/150"}
        alt="User"
        className="rounded-xl w-32 h-32 object-cover"
      />
    </figure>

    <div className="card-body items-center text-center">
      <h2 className="card-title">
        {conn.firstName} {conn.lastName}
      </h2>

      <p className="text-gray-600 text-sm">
        {conn.about}
      </p>
    </div>
  </div>
))}

   
  </>
    )
}

export default Connections