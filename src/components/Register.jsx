import React from 'react';
import { useRecoilState } from 'recoil';
import { registerState, userState } from '../states/atoms';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const baseUrlLocal = import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender = import.meta.env.VITE_BASE_URL_RENDER;

const Register = () => {
  const [formData, setFormData] = useRecoilState(registerState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrlLocal}/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background dark:text-dark-primaryText text-primaryText flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold dark:text-dark-primaryText text-primaryText">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm dark:text-dark-secondaryText text-secondaryText">
            Already have an account?{' '}
            <button
              onClick={handleNavigateToLogin}
              className="font-medium text-linkColor hover:text-secondaryText"
            >
              Login
            </button>
          </p>
          <div className="mt-8 bg-secondaryBackground dark:bg-dark-secondaryBackground py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium dark:text-dark-secondaryText text-secondaryText">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border dark:border-dark-border bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText placeholder-secondaryText dark:placeholder-dark-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium dark:text-dark-secondaryText text-secondaryText">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border dark:border-dark-border bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText placeholder-secondaryText dark:placeholder-dark-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium dark:text-dark-secondaryText text-secondaryText">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border dark:border-dark-border bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText placeholder-secondaryText dark:placeholder-dark-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-dark-secondaryText text-secondaryText">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border dark:border-dark-border bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText placeholder-secondaryText dark:placeholder-dark-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium dark:text-dark-secondaryText text-secondaryText">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border dark:border-dark-border bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText placeholder-secondaryText dark:placeholder-dark-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-buttonText dark:text-dark-buttonText bg-buttonBackground hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryAccent"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
