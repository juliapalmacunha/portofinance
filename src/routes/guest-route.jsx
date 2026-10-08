import { LoaderCircle } from 'lucide-react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AuthContext } from '@/context/auth.jsx';

const GuestRoute = () => {
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="size-6 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
