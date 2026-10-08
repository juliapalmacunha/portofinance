import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AuthContext } from '@/context/auth.jsx';

const GuestRoute = () => {
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return <p>Carregando...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
