import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../customhooks/useAuth';

const Protectedroute = ({ children }) => {
  const { currentuser  } = useAuth();

  return currentuser  ? <Outlet/> : <Navigate to="/login" />;
};

export default Protectedroute;
