import { format, isValid, parse, startOfMonth } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

const DATE_FORMAT = 'yyyy-MM-dd';

const getDefaultRange = () => ({
  from: startOfMonth(new Date()),
  to: new Date(),
});

const parseDateParam = (value) => {
  if (!value) return null;
  const date = parse(value, DATE_FORMAT, new Date());
  return isValid(date) ? date : null;
};

export const useDateRangeParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  const dateRange = useMemo(() => {
    const from = parseDateParam(fromParam);
    const to = parseDateParam(toParam);
    if (from && to && from <= to) return { from, to };
    return getDefaultRange();
  }, [fromParam, toParam]);

  const setDateRange = useCallback(
    (range) => {
      //recebe combo de datas que user aplicou
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('from', format(range.from, DATE_FORMAT));
        next.set('to', format(range.to, DATE_FORMAT));
        return next;
      });
    },
    [setSearchParams]
  );

  return [dateRange, setDateRange];
};
