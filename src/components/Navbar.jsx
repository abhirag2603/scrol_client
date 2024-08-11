import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/logout', {}, {
        withCredentials: true, // Ensure cookies are sent and received
        headers: {
          'Content-Type': 'application/json', // Ensure content type is set to JSON
        },
      });
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-black border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
        </a>
        <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-300 rounded md:bg-transparent md:text-white md:p-0 dark:bg-gray-700 dark:text-white">Home</a>
            </li>
            <li>
              <a href="/profile" className="block py-2 px-3 text-gray-300 rounded md:bg-transparent md:text-white md:p-0 dark:bg-gray-700 dark:text-white">Profile</a>
            </li>
            <li className="hidden md:flex md:items-center md:space-x-4">
              <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <div id="dropdownNavbar" className="z-10 hidden font-normal bg-gray-800 divide-y divide-gray-700 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-700">
            <ul className="py-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <a href="/" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Home</a>
              </li>
              <li>
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Profile</a>
              </li>
              <li>
                <button onClick={handleLogout} className="block px-4 py-2 text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
