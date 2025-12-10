import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from './utils/feedSlice'
import UserCard from './UserCard.jsx'
const Feed = () => {
  const feed=useSelector((store)=>store.feed)
  const dispatch=useDispatch()
  const getFeed=async()=>{
    try {
       if(feed) return
const res=await axios.get('http://localhost:3000/api/feed',{
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
  if(!feed) return null;
  return (
    <div className='flex justify-center items-center'>
  <UserCard firstName={feed[0].firstName} lastName={feed[0].lastName} photoUrl={feed[0].photoUrl} about={feed[0].about}/>
  </div>
  )
}

export default Feed;