import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../states/atoms';

const HomePage = () => {
  const [user] = useRecoilState(userState);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome, {user.username || 'User'}!</h1>
      <p className='text-red-700'>Email: {user.email}</p>
      {/* Other content */}
    </div>
  );
};

export default HomePage;
