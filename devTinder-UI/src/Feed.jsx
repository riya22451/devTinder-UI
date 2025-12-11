import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from './utils/feedSlice'

import UserCard from './UserCard.jsx'
import { API_BASE_URL } from './utils/constants.js'
const Feed = () => {
  const feed=useSelector((store)=>store.feed)
  const dispatch=useDispatch()
  const getFeed=async()=>{
    try {
      if(feed.length > 0) return

   
const res=await axios.get(API_BASE_URL+'api/feed',{
  withCredentials:true
  })
  console.log(res.data.finalusers)
  dispatch(setFeed(res.data.finalusers))
  }
    catch (error) {
      
    }
  }
  
  useEffect(()=>{
    getFeed()
  },[]) 
  if(!feed) return ;
  if(feed.length==0){
    return(
      <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='text-3xl font-bold my-5'>Feed</h1>
      <p className='text-lg'>No more users available at the moment. Please check back later.</p>
      </div>
    )
  } 
  return (
 <div className='flex justify-center items-center'>
  <UserCard firstName={feed[0].firstName} lastName={feed[0].lastName} photoUrl={feed[0].photoUrl} about={feed[0].about} userId={feed[0]._id}/>
  </div>
);

}

export default Feed;
