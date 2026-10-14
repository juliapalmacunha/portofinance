import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage.js';
import { UserService } from '@/services/user.js';

import { AuthContext } from './auth.jsx';

const saveTokens = (tokens) => {
  const accessToken = tokens?.accessToken;
  const refreshToken = tokens?.refreshToken;

  if (accessToken && refreshToken) {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
  }
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: UserService.signup,
  });

  console.log('signupMutation', { user });
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: UserService.login,
  });

  useEffect(() => {
    const handleLogout = () => setUser(null);

    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );

        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );

        if (!accessToken || !refreshToken) {
          return;
        }

        const userData = await UserService.getMe();

        setUser(userData);
      } catch (error) {
        console.error('Erro ao verificar tokens:', error);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (responseData) => {
        setUser(responseData);
        saveTokens(responseData.tokens);

        toast.success('Conta criada com sucesso!');
      },

      onError: (error) => {
        const message =
          error.response?.data?.message || 'Erro ao criar a conta';

        toast.error(message);
      },
    });
  };

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (responseData) => {
        setUser(responseData);
        saveTokens(responseData.tokens);

        toast.success('Login realizado com sucesso!');
      },

      onError: (error) => {
        const message =
          error.response?.data?.message || 'E-mail ou senha inválidos';

        toast.error(message);
      },
    });
  };

  const signout = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingSignup: signupMutation.isPending,
        loadingLogin: loginMutation.isPending,
        isInitializing,
        login,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
