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

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.username || 'Guest'}</h1>
      </div>
      <FeedPost />
    </div>
    </div>
  );
};

export default HomePage;
