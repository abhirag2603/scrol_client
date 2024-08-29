import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';

const baseUrl = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_RENDER
  : import.meta.env.VITE_BASE_URL_LOCAL;

const FriendRequestCard = ({ requestId, onAccept, onReject }) => {
  const [requestUser, setRequestUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const fetchRequestUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${requestId}`, {
        withCredentials: true,
      });
      setRequestUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching request user:', error);
      setError('Error fetching request user');
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${requestId}`);
  };

  const handleAccept = async () => {
    try {
      await axios.patch(`${baseUrl}/users/acceptRequest/${requestId}/${user._id}`, {}, {
        withCredentials: true,
      });
      await updateUserState();
      onAccept();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.patch(`${baseUrl}/users/rejectRequest/${requestId}/${user._id}`, {}, {
        withCredentials: true,
      });
      await updateUserState();
      onReject();
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  const updateUserState = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };


  useEffect(() => {
    fetchRequestUser();
  }, [requestId]);

  if (loading) {
    return <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText w-full flex items-center p-4 rounded-xl shadow border">Loading...</div>;
  }

  if (error) {
    return <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText w-full flex items-center p-4 rounded-xl shadow border">Error: {error}</div>;
  }

  return (
    <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText min-w-[20rem] flex items-center p-4 rounded-xl shadow border cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={requestUser.avatar || 'https://via.placeholder.com/64'}
          alt={`${requestUser.username}'s profile`}
          className="w-16 h-16 rounded-full border-2 border-primaryAccent"
          onClick={handleProfileClick}
        />
      </div>
      <div className="flex-grow p-3" onClick={handleProfileClick}>
        <div className="font-semibold text-primaryText dark:text-dark-primaryText">
          {requestUser.firstName} {requestUser.lastName}
        </div>
        <div className="text-sm text-secondaryText dark:text-dark-secondaryText">
          @{requestUser.username}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-600 text-white px-4 py-2 flex rounded hover:bg-green-700 transition"
          onClick={handleAccept}
        >
          <span class="material-symbols-outlined">
            check
          </span>
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded flex hover:bg-red-700 transition"
          onClick={handleDecline}
        >
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
