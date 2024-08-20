import React from 'react';
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

  return (
    <div className='bg-secondaryBackground h-14 flex justify-between items-center px-12 shadow-md'>
      <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-8' src='/ScrolLogo2.png' alt='Scrol Logo'/>
        <h1 className='text-primaryText font-semibold ml-2'>SCROL</h1>
      </div>
      {user && (
        <div className='flex items-center space-x-4'>
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
      )}
    </div>
  );
};

export default Navbar;
