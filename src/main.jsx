import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';

import { AuthContextProvider } from './context/auth-provider.jsx';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import SignupPage from './pages/Signup.jsx';
import GuestRoute from './routes/guest-route.jsx';
import ProtectedRoute from './routes/protected-route.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Toaster />
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
