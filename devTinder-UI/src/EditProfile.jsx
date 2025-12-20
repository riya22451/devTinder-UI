import React from 'react';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';
import { setUser } from './utils/userSlice';
import { API_BASE_URL } from './utils/constants.js';

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
  "https://dev-tinder-backend-taupe.vercel.app/api/profile/edit",
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
  <div className="min-h-screen flex flex-col lg:flex-row justify-center items-start gap-10 p-6 bg-base-100">

    {/* ----- LEFT: Edit Form ----- */}
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box 
                         w-full max-w-md border p-4 shadow-md">
      <legend className="fieldset-legend text-lg font-semibold">
        Edit your Profile
      </legend>

      <label className="label text-sm">First Name</label>
      <input
        type="text"
        className="input w-full p-3 text-sm"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label className="label text-sm">Last Name</label>
      <input
        type="text"
        className="input w-full p-3 text-sm"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label className="label text-sm">Email</label>
      <input
        type="text"
        className="input w-full p-3 text-sm"
        value={user?.emailId ?? ""}
        readOnly
      />

      <label className="label text-sm">Photo URL</label>
      <input
        type="text"
        className="input w-full p-3 text-sm"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      <label className="label text-sm">Gender</label>
      <input
        type="text"
        className="input w-full p-3 text-sm"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <label className="label text-sm">About</label>
      <textarea
        className="textarea w-full p-3 text-sm h-24 resize-none"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="btn btn-primary mt-4 w-full"
        onClick={handleProfileUpdate}
      >
        Save Profile
      </button>
    </fieldset>

    {/* ----- RIGHT: Preview Card ----- */}
    <div className="flex justify-center w-full max-w-sm">
      <UserCard
        firstName={firstName}
        lastName={lastName}
        photoUrl={photoUrl}
        about={about}
      />
    </div>

    {/* Toast Notification */}
    {update && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>
    )}
  </div>
);

};

export default EditProfile;
