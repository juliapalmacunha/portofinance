import { startOfMonth } from 'date-fns';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { DateFilter } from '@/components/date-filter.jsx';
import Header from '@/components/layout/header.jsx';
import { Button } from '@/components/ui/button.jsx';

const HomePage = () => {
  const [dateRange, setDateRange] = useState(() => ({
    from: startOfMonth(new Date()),
    to: new Date(),
  }));

  return (
    <div className="min-h-screen bg-[#140C30] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,#15565B_0%,#14253E_35%,#140C30_75%)] opacity-70" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Visão geral
              </h1>
              <p className="mt-1 text-sm text-white/50">
                Acompanhe suas finanças em um só lugar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <DateFilter value={dateRange} onChange={setDateRange} />

              <Button
                type="button"
                className="h-10 gap-2 rounded-lg bg-[#16A085] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#168777]"
              >
                <Plus className="size-4" />
                Nova transação
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
