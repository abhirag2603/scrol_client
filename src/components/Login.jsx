import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userState } from '../states/atoms';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const baseUrlLocal = import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender = import.meta.env.VITE_BASE_URL_RENDER;

const Login = () => {
  const [formData, setFormData] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const [errorMessage, setErrorMessage] = useState(null); // New state for error messages
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
        `${baseUrlLocal}/users/login`,
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
      // Capture and display error messages from the backend
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background text-primaryText flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primaryText">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-secondaryText">
            Don't have an account?{' '}
            <button
              onClick={handleNavigateToRegister}
              className="font-medium text-linkColor hover:text-secondaryText"
            >
              Register
            </button>
          </p>
          <div className="mt-8 bg-secondaryBackground py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">
                  {errorMessage}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondaryText">
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
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border bg-secondaryBackground text-primaryText placeholder-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondaryText">
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
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-border bg-secondaryBackground text-primaryText placeholder-secondaryText focus:outline-none focus:ring-primaryAccent focus:border-primaryAccent sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-buttonText bg-buttonBackground hover:bg-primaryAccent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryAccent"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
