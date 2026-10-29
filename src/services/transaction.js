import { format } from 'date-fns';

import { protectedApi } from '@/lib/axios.js';

export const TransactionService = {
  /**
   * Create a transaction for the authenticated user.
   * @param {Object} input
   * @param {string} input.name
   * @param {Date} input.date
   * @param {'EARNING'|'EXPENSE'|'INVESTMENT'} input.type
   * @param {number} input.amount
   */
  create: async ({ name, date, type, amount }) => {
    const response = await protectedApi.post('/transactions/me', {
      name,
      date: `${format(date, 'yyyy-MM-dd')}T00:00:00.000Z`,
      type,
      amount,
    });

    return response.data;
  },
};
