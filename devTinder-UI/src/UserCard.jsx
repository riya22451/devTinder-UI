import React from 'react'
import { useDispatch } from 'react-redux'
import { clearFeed } from './utils/feedSlice'
import axios from 'axios'

const UserCard = ({ firstName, lastName, photoUrl, about, userId }) => {
  const dispatch = useDispatch()

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/connection/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      )
      dispatch(clearFeed(userId))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div 
      className="
        card bg-base-200 shadow-sm 
        w-80 sm:w-80 md:w-80      /* stays same look everywhere */
        h-[580px]                /* EXACT same height as your original */
        mt-4 
        mx-auto                  /* centers card on all screens */
      "
    >
      <figure>
        <img
          className="
            w-full 
            h-80                  /* exact same height */
            object-cover 
            p-4 
            rounded-lg
          "
          src={photoUrl}
          alt="User"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        <p>{about}</p>

        <div className="card-actions justify-center mt-4">
          <button 
            className="btn btn-primary"
            onClick={() => handleRequest("ignore", userId)}
          >
            Ignore
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => handleRequest("interested", userId)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
