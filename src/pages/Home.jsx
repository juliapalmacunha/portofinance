import { useContext } from 'react';
import { Navigate } from 'react-router';

import Header from '@/components/layout/header.jsx';
import { AuthContext } from '@/context/auth.jsx';

const HomePage = () => {
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#140C30] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,#15565B_0%,#14253E_35%,#140C30_75%)] opacity-70" />

      <div className="relative z-10">
        <Header user={user} />

        <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8"></main>
      </div>
    </div>
  );
};

export default HomePage;
