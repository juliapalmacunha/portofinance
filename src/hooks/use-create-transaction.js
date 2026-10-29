import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TransactionService } from '@/services/transaction.js';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTransaction'],
    mutationFn: TransactionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
};
