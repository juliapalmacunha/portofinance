import { protectedApi, publicApi } from '@/lib/axios.js';

export const UserService = {
  signup: async (data) => {
    const response = await publicApi.post('/users', data);
    return response.data;
  },

  login: async (data) => {
    const response = await publicApi.post('/users/auth/login', data);
    return response.data;
  },

  getMe: async () => {
    const response = await protectedApi.get('/users/me');
    return response.data;
  },
};
