import { format } from 'date-fns';

import { protectedApi, publicApi } from '@/lib/axios.js';

const API_DATE_FORMAT = 'yyyy-MM-dd';

export const UserService = {
  /**
   * Create a new user account.
   * @param {Object} data - The user data.
   * @param {string} data.firstName - The user's first name.
   * @param {string} data.lastName - The user's last name.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<Object>} The created user and its tokens.
   */
  signup: async (data) => {
    const response = await publicApi.post('/users', data);
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  /**
   * Log in a user.
   * @param {Object} data - The credentials.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<Object>} The authenticated user and its tokens.
   */
  login: async (data) => {
    const response = await publicApi.post('/users/auth/login', data);
    const { user, tokens } = response.data;

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      tokens,
    };
  },

  /**
   * Return the authenticated user.
   * @returns {Promise<Object>} The authenticated user.
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

  /**
   * Return the authenticated user's financial summary for a period.
   * @param {Object} range - The period to filter by.
   * @param {Date} range.from - Start date (inclusive).
   * @param {Date} range.to - End date (inclusive).
   * @returns {Promise<Object>} Balance, earnings, expenses and investments.
   */
  getBalance: async ({ from, to }) => {
    const response = await protectedApi.get('/users/me/balance', {
      params: {
        from: format(from, API_DATE_FORMAT),
        to: format(to, API_DATE_FORMAT),
      },
    });

    console.log('UserService.getBalance', {
      from,
      to,
      response: response.data,
    });

    return {
      balance: Number(response.data.balance),
      earnings: Number(response.data.earnings),
      expenses: Number(response.data.expenses),
      investments: Number(response.data.investments),
      earningsPercent: Number(response.data.earningsPercent),
      expensesPercent: Number(response.data.expensesPercent),
      investmentsPercent: Number(response.data.investmentsPercent),
    };
  },
};
