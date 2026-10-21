import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { cn } from '@/lib/utils.js';

export const DatePickerWithRange = ({
  value,
  draftRange,
  isOpen,
  presets = [],
  activePreset,
  displayMonth,
  onOpenChange,
  onDateChange,
  onDisplayMonthChange,
  onPresetSelect,
  onApply,
  onCancel,
}) => {
  const formattedRange =
    value?.from && value?.to
      ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
      : 'Selecionar período';

  const isDraftComplete = Boolean(draftRange?.from && draftRange?.to);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-9 gap-2 rounded-lg border-white/10 bg-[#14253E]/70 px-3 text-xs font-medium text-white/85 hover:border-[#16A085]/30 hover:bg-[#153D4C] hover:text-white"
          />
        }
      >
        <CalendarDays className="size-3.5 text-[#16A085]" />

        <span>{formattedRange}</span>

        <ChevronDown
          className={cn(
            'size-3.5 text-white/40 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-fit max-w-[calc(100vw-1.5rem)] rounded-xl border border-white/10 bg-[#14253E] p-2 text-white shadow-xl shadow-black/20"
      >
        <div className="mb-1.5 flex flex-wrap justify-center gap-1.5">
          {presets.map((preset) => {
            const isActive = activePreset === preset.label;

            return (
              <Button
                key={preset.label}
                type="button"
                variant="outline"
                size="sm"
                aria-pressed={isActive}
                onClick={() => onPresetSelect(preset)}
                className={cn(
                  'h-7 rounded-md px-2.5 text-xs font-medium',
                  isActive
                    ? 'border-[#16A085]/50 bg-[#16A085]/15 text-[#53D4B8]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {preset.label}
              </Button>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-1.5">
          <Calendar
            mode="range"
            selected={draftRange}
            onSelect={onDateChange}
            month={displayMonth}
            onMonthChange={onDisplayMonthChange}
            numberOfMonths={2}
            locale={ptBR}
            className="p-0 text-xs [--cell-size:--spacing(6)]"
          />
        </div>

        <div className="mt-1.5 flex justify-end gap-2 border-t border-white/10 pt-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-7 px-2.5 text-xs text-white/60 hover:bg-white/5 hover:text-white"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onApply}
            disabled={!isDraftComplete}
            className="h-7 bg-[#16A085] px-3 text-xs text-white hover:bg-[#168777] disabled:opacity-40"
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
