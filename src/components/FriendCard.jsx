import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrlLocal= import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender=import.meta.env.VITE_BASE_URL_RENDER;

const FriendCard = ({friendId}) => {
  const [friendUser, setFriendUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${baseUrlLocal}/users/${friendId}`, {
        withCredentials: true,
      });
      setFriendUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching friend:', error);
      setError('Error fetching friend');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [friendId]);

  const handleProfileClick = () => {
    navigate(`/profile/${friendId}`);
  };

  if (loading) {
    return <div className="bg-white w-full flex items-center p-4 rounded-xl shadow border">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white w-full flex items-center p-4 rounded-xl shadow border">Error: {error}</div>;
  }

  return (
    <div 
      className="bg-white w-full flex items-center p-4 rounded-xl shadow border cursor-pointer" 
      onClick={handleProfileClick}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={friendUser.avatar || 'https://via.placeholder.com/64'} 
          alt={`${friendUser.username}'s profile`} 
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex-grow p-3">
        <div className="font-semibold text-gray-700">
          {friendUser.firstName} {friendUser.lastName}
        </div>
        <div className="text-sm text-gray-500">
          @{friendUser.username}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
