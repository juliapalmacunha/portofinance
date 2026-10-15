import { protectedApi, publicApi } from '@/lib/axios.js';

export const UserService = {
  /**
   * Create a new user account.
   * @param {Object} data - The user data.
   * @param {string} data.firstName - The user's first name.
   * @param {string} data.lastName - The user's last name.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<Object>} A promise that resolves to the created user object.
   *
   *
   */

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

  /**
   * Log in a user.
   * @param {Object} data - The user data.
   * @param {string} data.firstName - The user's first name.
   * @param {string} data.lastName - The user's last name.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Object} usuario criado.
   * @returns {string} response tokens - tokens de autenticação.
   */

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

  /**
   * return auth user.
   * @returns {Object} usuario autenticado.
   */

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
