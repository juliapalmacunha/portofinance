import { BalanceView } from '@/components/balance-view.jsx';
import { useUrlDateRange } from '@/hooks/use-url-date-range.js';
import { useUserBalance } from '@/hooks/use-user-balance.js';

export const Balance = () => {
  const [dateRange] = useUrlDateRange();
  const { data, isLoading } = useUserBalance(dateRange);

  return <BalanceView data={data} isLoading={isLoading} />;
};
