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

export const DatePickerWithRange = ({
  value,
  draftRange,
  isOpen,
  presets = [],
  activePreset,
  onOpenChange,
  onDateChange,
  onPresetSelect,
  onApply,
  onCancel,
}) => {
  const formattedRange =
    value?.from && value?.to
      ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
      : 'Selecionar período';

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 gap-2.5 rounded-lg border-white/10 bg-[#14253E]/70 px-4 text-sm font-medium text-white/85 hover:border-[#16A085]/30 hover:bg-[#153D4C] hover:text-white"
        >
          <CalendarDays className="size-4 text-[#16A085]" />

          <span>{formattedRange}</span>

          <ChevronDown
            className={`size-4 text-white/40 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-fit max-w-[calc(100vw-1.5rem)] overflow-x-auto rounded-xl border border-white/10 bg-[#14253E] p-3 text-white shadow-xl shadow-black/20"
      >
        <div className="mb-2 flex gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPresetSelect(preset)}
              className={`h-8 rounded-md px-3 text-xs font-medium ${
                activePreset === preset.label
                  ? 'border-[#16A085]/50 bg-[#16A085]/15 text-[#53D4B8]'
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              } `}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <div className="border-t border-white/10 pt-2">
          <Calendar
            mode="range"
            selected={draftRange}
            onSelect={onDateChange}
            numberOfMonths={2}
            locale={ptBR}
            className="w-fit bg-transparent p-0 text-white [--cell-size:32px] [--rdp-accent-background-color:#16A085] [--rdp-accent-color:#16A085]"
            classNames={{
              months: 'flex flex-row gap-4',
              month: 'flex flex-col gap-2',
              month_caption: 'flex h-8 items-center justify-center',
              caption_label: 'text-sm font-semibold text-white',
              weekdays: 'flex',
              weekday: 'w-8 text-center text-xs font-medium text-white/60',
              week: 'mt-1 flex',
              day: 'size-8 p-0 text-sm',
              day_button: 'size-8 rounded-md text-sm',
            }}
          />
        </div>

        <div className="mt-2 flex justify-end gap-2 border-t border-white/10 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-9 px-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onApply}
            disabled={!draftRange?.from || !draftRange?.to}
            className="h-9 bg-[#16A085] px-4 text-sm text-white hover:bg-[#168777]"
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
