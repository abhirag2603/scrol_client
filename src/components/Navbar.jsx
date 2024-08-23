import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/users/logout`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div className='bg-secondaryBackground h-14 flex justify-between items-center px-8 shadow-md'>
      <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-8' src='/ScrolLogo2.png' alt='Scrol Logo'/>
        <h1 className='text-primaryText font-semibold ml-2'>SCROL</h1>
      </div>
      {user && (
        <div className='flex items-center space-x-4 relative'>
          {/* Menu button for medium and small screens */}
          <button
            onClick={toggleDropdown}
            className='lg:hidden bg-primaryAccent hover:bg-secondaryAccent text-buttonText font-semibold px-4 py-2 rounded'
          >
            Menu
          </button>
          {/* Dropdown menu for medium and small screens */}
          <ul className={`${showDropdown ? 'absolute top-12 right-0 flex flex-col items-center bg-secondaryBackground border border-gray-100 rounded shadow-lg z-10' : 'hidden'}`}>
            <li 
              className="text-primaryText font-semibold py-2 px-4 hover:bg-primaryAccent cursor-pointer w-full text-center"
              onClick={() => { toggleDropdown(); navigate('/'); }}
            >
              Home
            </li>
            <li 
              className="text-primaryText font-semibold py-2 px-4 hover:bg-primaryAccent cursor-pointer w-full text-center"
              onClick={() => { toggleDropdown(); navigate(`/profile/${user._id}`); }}
            >
              Profile
            </li>
            <li 
              className="text-primaryText font-semibold py-2 px-4 hover:bg-primaryAccent cursor-pointer w-full text-center"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
          {/* Inline menu for large screens */}
          <div className='hidden lg:flex lg:items-center lg:space-x-4'>
            <button
              onClick={() => navigate('/')}
              className='text-primaryText font-semibold hover:text-primaryAccent'
            >
              Home
            </button>
            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className='text-primaryText font-semibold hover:text-primaryAccent'
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className='bg-primaryAccent hover:bg-secondaryAccent text-buttonText font-semibold px-4 py-2 rounded'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
