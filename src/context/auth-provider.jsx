import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/lib/axios.js';

import { AuthContext } from './auth.jsx';

const saveTokens = (tokens) => {
  const accessToken = tokens?.accessToken;
  const refreshToken = tokens?.refreshToken;

  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  // Mantém o usuário logado ao recarregar a página
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

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
        isSigningUp: signupMutation.isPending,
        isLoggingIn: loginMutation.isPending,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
