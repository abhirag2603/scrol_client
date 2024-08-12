import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../states/atoms';
import FeedPost from './FeedPost';
import Navbar from './Navbar';
import UserCard from './UserCard';
import CreatePostWidget from './CreatePostWidget'

const HomePage = () => {
  const [user] = useRecoilState(userState);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen cursor-pointer">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row justify-center lg:justify-around mt-16 space-y-8 lg:space-y-0 lg:space-x-8 px-4 lg:px-8">
        
        <div className="lg:w-1/4">
          <UserCard />
        </div>

        <div className="lg:w-1/2">
          <FeedPost />
        </div>

      
        <div className="hidden lg:block lg:w-1/4">
          <CreatePostWidget />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
