import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/logout', {}, {
        withCredentials: true,
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
    <div className='bg-gray-800 h-14 flex justify-between items-center px-12'>
      <div className='flex items-center justify-center'>
        <img className='w-8' src='https://res.cloudinary.com/dual7doua/image/upload/v1723401411/fxvmfncunwqiteeciwua.png' alt='Scrol Logo'/>
        <h1 className='text-white font-semibold ml-2'>SCROL</h1>
      </div>
      {user && (
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => navigate('/')} // Navigate to Home
            className='text-white font-semibold hover:text-blue-400'
          >
            Home
          </button>
          <button
            onClick={() => navigate(`/profile/${user._id}`)} // Navigate to Profile
            className='text-white font-semibold hover:text-blue-400'
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-1/2 rounded'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
