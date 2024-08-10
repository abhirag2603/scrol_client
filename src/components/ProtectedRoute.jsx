import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/atoms';

const ProtectedRoute = ({ element, ...rest }) => {
  const user = useRecoilValue(userState);

  // Render the element if user exists, otherwise redirect to login
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

