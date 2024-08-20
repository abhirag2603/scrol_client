import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../states/atoms';
import FeedPost from './FeedPost';
import Navbar from './Navbar';
import UserCard from './UserCard';
import CreatePostWidget from './CreatePostWidget';

const baseUrlLocal = import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender = import.meta.env.VITE_BASE_URL_RENDER;

const HomePage = () => {
  const [user] = useRecoilState(userState);
  const navigate = useNavigate();
  const feedPostRef = useRef(null);

  const handlePostCreated = () => {
    if (feedPostRef.current) {
      feedPostRef.current.refreshPosts();
    }
  };

  return (
    <div className="min-h-screen bg-background text-primaryText dark:bg-background dark:text-primaryText cursor-pointer">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-secondaryBackground dark:bg-secondaryBackground">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row justify-center lg:justify-between mt-16 lg:space-x-8 px-4 lg:px-8">
        
        <div className="lg:w-1/4 lg:h-1/4">
          <UserCard />
        </div>

        <div className="lg:w-1/2">
          <FeedPost ref={feedPostRef} />
        </div>

        <div className="lg:w-1/4 lg:h-1/4 hidden lg:block">
          <CreatePostWidget onPostCreated={handlePostCreated} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
