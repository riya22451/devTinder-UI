import React, { useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, clearRequests } from './utils/requestSlice'
import { API_BASE_URL } from './utils/constants'
const Requests = () => {
    const dispatch=useDispatch()
    const requests=useSelector((store)=>store.requests)
    const fetchRequest=async()=>{
        try {
            const res=await axios.get(API_BASE_URL+"api/user/requests",{withCredentials:true})
        console.log(res.data.requests)
        dispatch(addRequests(res.data.requests))
        } catch (error) {
            console.log(error)
        }
        
    }
    const reviewRequests=async(status,requestId)=>{
        try {
             const res=await axios.post(API_BASE_URL+'api/connection/request/review/'+status+'/'+requestId,{},{withCredentials:true})
             dispatch(clearRequests(requestId))
       
        } catch (error) {
            
        }
       
    }
    useEffect(()=>{
        fetchRequest()
    },[])
  if(!requests) return;
    if(requests.length==0){
        return(
            <div className='flex flex-col justify-center items-center my-10'>
            <h1 className='text-3xl font-bold my-5'>Requests</h1>
            <p className='text-lg'>You have no requests at the moment.</p>
            </div>
        )
    }
   return (
     <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Requests</h2>

      <div className="divide-y divide-gray-300">
        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="flex items-center py-4 gap-4"
            >
              {/* Photo */}
              <img
                src={user?.photoUrl}
                alt={user?.firstName}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-600 text-sm">{user?.about}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <button className="btn btn-success btn-sm w-20" onClick={() => reviewRequests('accepted', req._id)}
>
                  Accept
                </button>
                <button className="btn btn-error btn-sm w-20" onClick={() => reviewRequests('rejected', req._id)}
>
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default Requests