// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/atoms';

const PublicRoute = ({ element }) => {
  const user = useRecoilValue(userState);

  return !user ? element : <Navigate to="/" replace />;
};

export default PublicRoute;
