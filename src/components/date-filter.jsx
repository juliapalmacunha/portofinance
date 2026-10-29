import {
  endOfMonth,
  isSameDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { useState } from 'react';

import { DatePickerWithRange } from '@/components/ui/date-picker-with-range.jsx';
import { useUrlDateRange } from '@/hooks/use-url-date-range.js';

const getPresets = () => {
  const today = new Date();
  const previousMonth = subMonths(today, 1);

  return [
    {
      label: 'Este mês',
      range: { from: startOfMonth(today), to: today },
    },
    {
      label: 'Mês passado',
      range: {
        from: startOfMonth(previousMonth),
        to: endOfMonth(previousMonth),
      },
    },
    {
      label: '30 dias',
      range: { from: subDays(today, 29), to: today },
    },
  ];
};

const matchesRange = (first, second) =>
  Boolean(
    first?.from &&
    first?.to &&
    second?.from &&
    second?.to &&
    isSameDay(first.from, second.from) &&
    isSameDay(first.to, second.to)
  );

export const DateFilter = () => {
  const [dateRange, setDateRange] = useUrlDateRange();

  const [draftRange, setDraftRange] = useState(dateRange);
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(() =>
    startOfMonth(dateRange.from)
  );

  const presets = getPresets();

  const activePreset = presets.find((preset) =>
    matchesRange(draftRange, preset.range)
  )?.label;

  const resetDraft = () => {
    setDraftRange(dateRange);
    setDisplayMonth(startOfMonth(dateRange.from));
  };

  const handleOpenChange = (open) => {
    if (open) resetDraft();
    setIsOpen(open);
  };

  const handlePresetSelect = (preset) => {
    setDraftRange(preset.range);
    setDisplayMonth(startOfMonth(preset.range.from));
  };

  const handleDateChange = (range, selectedDay) => {
    if (!selectedDay) return;

    if (draftRange?.from && draftRange?.to) {
      setDraftRange({ from: selectedDay, to: undefined });
      return;
    }

    setDraftRange(range);
  };

  const handleApply = () => {
    if (!draftRange?.from || !draftRange?.to) return;

    setDateRange(draftRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resetDraft();
    setIsOpen(false);
  };

  return (
    <DatePickerWithRange
      value={dateRange}
      draftRange={draftRange}
      isOpen={isOpen}
      presets={presets}
      activePreset={activePreset}
      displayMonth={displayMonth}
      onOpenChange={handleOpenChange}
      onDateChange={handleDateChange}
      onDisplayMonthChange={setDisplayMonth}
      onPresetSelect={handlePresetSelect}
      onApply={handleApply}
      onCancel={handleCancel}
    />
  );
};
