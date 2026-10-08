import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/lib/axios.js';

import { AuthContext } from './auth.jsx';

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access_token';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refresh_token';

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

    mutationFn: async (data) => {
      const response = await api.post('/users', data);

      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],

    mutationFn: async (data) => {
      const response = await api.post('/users/auth/login', data);

      return response.data;
    },
  });

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

        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Erro ao verificar tokens:', error);

        removeTokens();
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        loadingSignup: signupMutation.isPending,
        loadingLogin: loginMutation.isPending,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
