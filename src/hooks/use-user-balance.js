import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useContext } from 'react';

import { AuthContext } from '@/context/auth.jsx';
import { UserService } from '@/services/user.js';

export const useUserBalance = (dateRange) => {
  const { user } = useContext(AuthContext);
  const from = format(dateRange.from, 'yyyy-MM-dd');
  const to = format(dateRange.to, 'yyyy-MM-dd');

  return useQuery({
    enabled: Boolean(user?.id),
    queryKey: ['balance', from, to, user?.id],
    queryFn: () => UserService.getBalance(dateRange),
    placeholderData: keepPreviousData,
  });
};
