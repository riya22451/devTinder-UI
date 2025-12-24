import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from './utils/connectionSlice';
import { API_BASE_URL } from './utils/constants';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connection = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "api/user/connections", {
        withCredentials: true
      });
      dispatch(setConnections(res.data.connections));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return null;

  if (connection.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="text-3xl font-bold my-5">Connections</h1>
        <p className="text-lg">You have no connections yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>

      <div className="divide-y divide-gray-300">
        {connection.map((conn) => (
          <div
            key={conn._id}
            className="flex items-center py-4 gap-4"
          >
            <img
              src={conn.photoUrl || "https://via.placeholder.com/150"}
              alt={conn.firstName}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {conn.firstName} {conn.lastName}
              </h3>
              <p className="text-gray-600 text-sm">{conn.about}</p>
            </div>

            {/* ✅ Chat Button */}
            <button
              onClick={() => navigate(`/chat/${conn._id}`)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                         hover:bg-indigo-700 transition"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
