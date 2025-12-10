import React from 'react';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';
import { setUser } from './utils/userSlice';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // safe fallback values
  const [firstName, setFirstName] = React.useState(user?.firstName ?? "");
  const [lastName, setLastName] = React.useState(user?.lastName ?? "");
  const [photoUrl, setPhotoUrl] = React.useState(user?.photoUrl ?? "");
  const [about, setAbout] = React.useState(user?.about ?? "");
  const [gender, setGender] = React.useState(user?.gender ?? "");
  const [update,setUpdate]=React.useState(false);
  const [error,setError]=React.useState("");

  // renamed to avoid conflict
  const handleProfileUpdate = async () => {
    try {
      setError("")
      const res = await axios.patch(
  "http://localhost:3000/api/profile/edit",
  {
    firstName,
    lastName,
    photoUrl,
    about,
    gender,
  },
  {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",   // ⭐ CHROME NEEDS THIS FOR PATCH + COOKIES
    }
  }
);

    
     setUpdate(true)
    dispatch(setUser(res.data.user))
    setTimeout(()=>{
      setUpdate(false)
    },3000)
    // Optionally dispatch update Redux store
    } catch (error) {
      setError(error.response.data.message)
      console.error("Error updating profile:", error);
    }
    
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit your Profile</legend>

        <label className="label">FirstName</label>
        <input
          type="text"
          className="input p-6"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your FirstName"
        />

        <label className="label">LastName</label>
        <input
          type="text"
          className="input p-6"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your LastName"
        />

        <label className="label">Email</label>
        <input
          type="text"
          className="input p-6"
          value={user?.emailId ?? ""}
          readOnly
        />

        <label className="label">Photo Url</label>
        <input
          type="text"
          className="input p-6"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Enter your PhotoUrl"
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input p-6"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter your gender"
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input p-6"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Enter your About"
        />
{error && <p className='text-red-500'>{error}</p>}
        <button
          className="btn btn-primary mt-4"
          onClick={handleProfileUpdate}
        >
          Save Profile
        </button>
      </fieldset>

      {/* Preview Card */}
      <UserCard
        firstName={firstName}
        lastName={lastName}
        photoUrl={photoUrl}
        about={about}
      />
      {update &&   <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile Updated successfully.</span>
  </div>
</div> }
    
    </>
  );
};

export default EditProfile;
