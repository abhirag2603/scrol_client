// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Register from './components/Register';
import { userState } from './states/atoms';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { loadFromLocalStorage } from './utils/storage';

const App = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const userFromLocalStorage = loadFromLocalStorage('user');
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    }
  }, [setUser]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute element={<Login />} />} />
          <Route path='/register' element={<PublicRoute element={<Register />} />} />
          <Route path='/' element={<ProtectedRoute element={<HomePage />} />} />
          <Route path='/profile/:userId' element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
