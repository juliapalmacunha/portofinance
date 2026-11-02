import { zodResolver } from '@hookform/resolvers/zod';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { useCreateTransaction } from '@/hooks/use-create-transaction.js';
import { cn } from '@/lib/utils.js';

const TRANSACTION_TYPES = [
  { value: 'EXPENSE', label: 'Gasto', dotClassName: 'bg-rose-400' },
  { value: 'EARNING', label: 'Ganho', dotClassName: 'bg-[#2DD4AA]' },
  { value: 'INVESTMENT', label: 'Investimento', dotClassName: 'bg-sky-400' },
];

// Regras iguais às do backend
const transactionSchema = z.object({
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    error: 'Selecione o tipo',
  }),
  amount: z
    .number({ error: 'Informe o valor' })
    .min(1, 'O valor mínimo é R$ 1,00'),
  name: z
    .string()
    .trim()
    .min(1, 'Informe uma descrição')
    .max(50, 'Use no máximo 50 caracteres'),
  date: z.date({ error: 'Informe a data' }),
});

const getDefaultValues = () => ({
  type: 'EXPENSE',
  amount: undefined,
  name: '',
  date: new Date(),
});

const formatDateLabel = (date) =>
  isToday(date)
    ? 'Hoje'
    : format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });

// Visual compartilhado pelos campos de descrição e data
const fieldClassName =
  'h-11 w-full rounded-lg border-white/15 bg-white/[0.04] px-3 text-base text-white placeholder:text-white/40 md:text-base';

const labelClassName = 'text-sm font-normal text-white/70';
const errorClassName = 'text-rose-300';

// Valor em reais sem o "R$", que já aparece ao lado do campo: 2.300,50
const amountFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Máscara de centavos (estilo app de banco): cada dígito entra pela direita
// "2" → 0,02 | "23" → 0,23 | "230050" → 2.300,50
const MAX_DIGITS = 9; // 7 dígitos inteiros + 2 centavos: até R$ 9.999.999,99

const parseAmountInput = (text) => {
  const digits = text.replace(/\D/g, '').slice(0, MAX_DIGITS);
  if (!digits) return undefined;
  return Number(digits) / 100;
};

const formatAmountInput = (value) =>
  value === undefined ? '' : amountFormatter.format(value);

// O campo cresce junto com o número (1 "ch" = largura de um dígito)
const getAmountInputWidth = (text) => `${Math.max(text.length, 4) + 0.5}ch`;

export const AddTransactionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: getDefaultValues(),
    mode: 'onTouched',
  });

  const handleOpenChange = (open) => {
    // Ao fechar, limpa o formulário para a próxima abertura
    if (!open) reset(getDefaultValues());
    setIsOpen(open);
  };

  const onSubmit = (data) => {
    createTransaction(data, {
      onSuccess: () => {
        toast.success('Transação adicionada');
        handleOpenChange(false);
      },
      onError: () => {
        toast.error('Não foi possível salvar a transação. Tente novamente.');
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="h-10 gap-2 rounded-lg bg-[#16A085] px-4 text-base font-medium text-white transition-colors duration-200 hover:bg-[#168777]"
      >
        <Plus className="size-4" />
        Nova transação
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="gap-0 rounded-2xl border border-white/10 bg-[#14253E] p-6 text-white shadow-2xl shadow-black/40 sm:max-w-md">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-medium">
              Nova transação
            </DialogTitle>
            <DialogDescription className="text-sm text-white/60">
              Registre um gasto, ganho ou investimento.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-5">
              {/* Tipo: controle segmentado */}
              <Field>
                <FieldLabel id="transaction-type-label" className="sr-only">
                  Tipo
                </FieldLabel>

                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <div
                      role="radiogroup"
                      aria-labelledby="transaction-type-label"
                      className="grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1"
                    >
                      {TRANSACTION_TYPES.map((type) => {
                        const isActive = field.value === type.value;

                        return (
                          <button
                            key={type.value}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            onClick={() => field.onChange(type.value)}
                            className={cn(
                              'flex h-9 items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors',
                              isActive
                                ? 'bg-white/10 text-white'
                                : 'text-white/60 hover:text-white'
                            )}
                          >
                            <span
                              className={cn(
                                'size-2 rounded-full transition-opacity',
                                type.dotClassName,
                                !isActive && 'opacity-40'
                              )}
                            />
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />

                {errors.type && (
                  <FieldError
                    className={errorClassName}
                    errors={[errors.type]}
                  />
                )}
              </Field>

              {/* Valor: destaque principal, formatado em reais */}
              <Field className="items-center py-2 text-center">
                <FieldLabel
                  htmlFor="transaction-amount"
                  className="text-xs font-medium tracking-wider text-white/60 uppercase"
                >
                  Valor
                </FieldLabel>

                <div className="flex max-w-full items-baseline justify-center gap-1.5">
                  <span className="text-2xl font-medium text-white/60">R$</span>

                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="transaction-amount"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="0,00"
                        value={formatAmountInput(field.value)}
                        onChange={(event) =>
                          field.onChange(parseAmountInput(event.target.value))
                        }
                        onBlur={field.onBlur}
                        aria-invalid={!!errors.amount}
                        style={{
                          width: getAmountInputWidth(
                            formatAmountInput(field.value)
                          ),
                        }}
                        className="max-w-full min-w-0 bg-transparent text-center text-4xl font-medium tracking-tight text-white tabular-nums outline-none placeholder:text-white/25 sm:text-5xl"
                      />
                    )}
                  />
                </div>

                {errors.amount && (
                  <FieldError
                    className={errorClassName}
                    errors={[errors.amount]}
                  />
                )}
              </Field>

              {/* Descrição */}
              <Field>
                <FieldLabel
                  htmlFor="transaction-name"
                  className={labelClassName}
                >
                  Descrição
                </FieldLabel>

                <Input
                  id="transaction-name"
                  placeholder="Mercado, salário, CDB..."
                  autoComplete="off"
                  aria-invalid={!!errors.name}
                  className={fieldClassName}
                  {...register('name')}
                />

                {errors.name && (
                  <FieldError
                    className={errorClassName}
                    errors={[errors.name]}
                  />
                )}
              </Field>

              {/* Data: calendário no lugar do seletor nativo */}
              <Field>
                <FieldLabel
                  htmlFor="transaction-date"
                  className={labelClassName}
                >
                  Data
                </FieldLabel>

                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger
                        render={
                          <button
                            id="transaction-date"
                            type="button"
                            className={cn(
                              fieldClassName,
                              'flex items-center justify-between border text-left transition-colors outline-none focus-visible:border-[#16A085]/60'
                            )}
                          />
                        }
                      >
                        <span className="flex items-center gap-2">
                          <CalendarDays className="size-4 text-[#16A085]" />
                          {formatDateLabel(field.value)}
                        </span>

                        <ChevronDown
                          className={cn(
                            'size-4 text-white/50 transition-transform',
                            isCalendarOpen && 'rotate-180'
                          )}
                        />
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        sideOffset={6}
                        className="w-fit rounded-xl border border-white/10 bg-[#14253E] p-2 text-white shadow-xl shadow-black/30"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          defaultMonth={field.value}
                          onSelect={(date) => {
                            if (!date) return;
                            field.onChange(date);
                            setIsCalendarOpen(false);
                          }}
                          locale={ptBR}
                          className="p-0 text-sm [--cell-size:--spacing(9)]"
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />

                {errors.date && (
                  <FieldError
                    className={errorClassName}
                    errors={[errors.date]}
                  />
                )}
              </Field>
            </FieldGroup>

            <div className="mt-7 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="h-11 flex-1 rounded-lg text-base text-white/70 hover:bg-white/5 hover:text-white"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="h-11 flex-1 rounded-lg bg-[#16A085] text-base font-medium text-white hover:bg-[#168777] disabled:opacity-50"
              >
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
