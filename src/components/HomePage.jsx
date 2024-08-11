import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../states/atoms';
import FeedPost from './FeedPost';
import axios from 'axios';
import Navbar from './Navbar';

const HomePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/logout', {}, {
        withCredentials: true, // Ensure cookies are sent and received
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(null); // Clear user state
      localStorage.removeItem('user'); // Remove user data from local storage
      navigate('/login', { replace: true }); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.username || 'Guest'}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <FeedPost />
    </div>
    </div>
  );
};

export default HomePage;
