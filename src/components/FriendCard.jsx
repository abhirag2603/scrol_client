import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const FriendCard = ({ friendId }) => {
  const [friendUser, setFriendUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      
      const response = await axios.get(`${baseUrl}/users/${friendId}`, {
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
    return <div className="bg-secondaryBackground text-primaryText w-full flex items-center p-4 rounded-xl shadow border">Loading...</div>;
  }

  if (error) {
    return <div className="bg-secondaryBackground text-primaryText w-full flex items-center p-4 rounded-xl shadow border">Error: {error}</div>;
  }

  return (
    <div 
      className="bg-secondaryBackground text-primaryText min-w-[20rem] flex items-center p-4 rounded-xl shadow border cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleProfileClick}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={friendUser.avatar || 'https://via.placeholder.com/64'} 
          alt={`${friendUser.username}'s profile`} 
          className="w-16 h-16 rounded-full border-2 border-primaryAccent"
        />
      </div>
      <div className="flex-grow p-3">
        <div className="font-semibold">
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
