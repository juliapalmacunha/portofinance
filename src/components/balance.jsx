import { useUrlDateRange } from '@/hooks/use-url-date-range.js';
import { useUserBalance } from '@/hooks/use-user-balance.js';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

const BALANCE_ITEMS = [
  { key: 'balance', label: 'Saldo', dotClassName: 'bg-white/60', isMain: true },
  { key: 'earnings', label: 'Ganhos', dotClassName: 'bg-[#2DD4AA]' },
  { key: 'expenses', label: 'Gastos', dotClassName: 'bg-rose-400' },
  { key: 'investments', label: 'Investimentos', dotClassName: 'bg-sky-400' },
];

const DIVIDER_CLASSES = [
  '',
  'border-l',
  'border-t md:border-t-0 md:border-l',
  'border-l border-t md:border-t-0',
];

/**
 * Resumo financeiro do período selecionado no filtro:
 * saldo, ganhos, gastos e investimentos.
 */
export const Balance = () => {
  const [dateRange] = useUrlDateRange();
  const { data, isLoading } = useUserBalance(dateRange);

  return (
    <section
      aria-label="Resumo financeiro"
      className="grid grid-cols-2 rounded-xl border border-white/8 bg-white/2 md:grid-cols-4"
    >
      {BALANCE_ITEMS.map((item, index) => (
        <div
          key={item.key}
          className={`border-white/8 px-5 py-4 ${DIVIDER_CLASSES[index]}`}
        >
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${item.dotClassName}`} />
            <span className="text-[11px] font-medium tracking-wider text-white/40 uppercase">
              {item.label}
            </span>
          </div>

          {isLoading ? (
            <div className="mt-2.5 h-6 w-24 animate-pulse rounded bg-white/6" />
          ) : (
            <p
              className={`mt-2 font-medium tracking-tight text-white tabular-nums ${
                item.isMain ? 'text-xl' : 'text-lg text-white/90'
              }`}
            >
              {formatCurrency(data?.[item.key])}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};
