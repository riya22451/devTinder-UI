import React from 'react'

const UserCard = ({firstName,lastName,photoUrl,about}) => {
    
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
      <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard