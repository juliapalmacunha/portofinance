import { protectedApi, publicApi } from '@/lib/axios.js';

export const UserService = {
  signup: async (data) => {
    const response = await publicApi.post('/users', data);
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    };
  },

  login: async (data) => {
    const response = await publicApi.post('/users/auth/login', data);
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    };
  },

  getMe: async () => {
    const response = await protectedApi.get('/users/me');
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    };
  },
};
