import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState, themeModeState } from '../states/atoms';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './switch.css'

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    setShowDropdown(!showDropdown);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    document.documentElement.classList.toggle('dark', newThemeMode === 'dark');
  };

  return (
    <div className='bg-secondaryBackground dark:bg-dark-secondaryBackground h-14 flex justify-between items-center px-8 shadow-md'>
      <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-8' src='/ScrolLogo2.png' alt='Scrol Logo'/>
        <h1 className='text-primaryText dark:text-dark-primaryText font-semibold ml-2'>SCROL</h1>
      </div>

      {user && (
        <div className='flex-grow flex justify-center items-center'>
          <form 
            method="GET" 
            className='relative w-1/2 max-w-md'
            onSubmit={handleSearchSubmit}
          >
            <input 
              type="search" 
              name="q" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='py-2 pl-4 pr-10 rounded-md text-dark-primaryText dark:text-primaryText focus:outline-none bg-dark-secondaryBackground dark:bg-secondaryBackground w-full'
              placeholder="Search..." 
              autoComplete="off" 
            />
            <button type="submit" className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className='w-6 h-6'>
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </form>
        </div>
      )}

      <div className='flex items-center space-x-4 relative'>
        {user && (
          <>
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className=' text-buttonText dark:text-dark-buttonText font-semibold px-4 py-2 rounded'
              >{user.avatar?
                <img
                  alt="User Avatar"
                  src={user.avatar}
                  className='w-10 h-10 rounded-full'
                />:
                <p>User</p>
              }
              </button>
              <ul className={`${showDropdown ? 'absolute top-12 right-0 flex flex-col items-center bg-secondaryBackground dark:bg-dark-secondaryBackground border border-gray-100 rounded shadow-lg z-10' : 'hidden'}`}>
                <li 
                  className="text-primaryText dark:text-dark-primaryText font-semibold py-2 px-4 hover:bg-primaryAccent cursor-pointer w-full text-center"
                  onClick={() => { toggleDropdown(); navigate(`/profile/${user._id}`); }}
                >
                  Profile
                </li>
                <li 
                  className="text-primaryText dark:text-dark-primaryText font-semibold py-2 px-4 hover:bg-primaryAccent cursor-pointer w-full text-center"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </>
        )}
        
        <label className="ui-switch">
          <input type="checkbox" checked={themeMode === 'dark'} onChange={toggleTheme} />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
