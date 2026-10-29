import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { UserService } from '@/services/user.js';

export const useUserBalance = (dateRange) => {
  const from = format(dateRange.from, 'yyyy-MM-dd');
  const to = format(dateRange.to, 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['balance', from, to],
    queryFn: () => UserService.getBalance(dateRange),
    placeholderData: keepPreviousData,
  });
};
