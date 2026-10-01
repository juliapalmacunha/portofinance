import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import PasswordInput from '@/components/password-input.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.jsx';
import { Input } from '@/components/ui/input.jsx';

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  email: z.email('E-mail inválido'),

  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),

  acceptedTerms: z.literal(true, {
    error: 'Você precisa aceitar os termos de uso',
  }),
});

const SignupPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: '',
      email: '',
      password: '',
      acceptedTerms: false,
    },

    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    console.log(data);

    // TODO: chamar a API de cadastro
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--palette-3)/0.45),transparent_60%)] px-4 py-5">
      <Card className="border-border bg-card w-full max-w-md gap-6 py-8 shadow-2xl shadow-black/40">
        <CardHeader className="gap-2 px-8">
          <div
            className="bg-primary/15 text-primary mb-2 flex size-10 items-center justify-center rounded-lg"
            aria-hidden="true"
          >
            <ShieldCheck className="size-5" />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            <h1>Crie a sua conta</h1>
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Insira seus dados abaixo para criar uma conta
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="mb-5 px-8">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>

                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Como aparece no seu documento"
                  aria-invalid={!!errors.name}
                  className="bg-background/60 h-11"
                  {...register('name')}
                />

                {errors.name && <FieldError errors={[errors.name]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  aria-invalid={!!errors.email}
                  className="bg-background/60 h-11"
                  {...register('email')}
                />

                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>

                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  placeholder="Mínimo de 8 caracteres"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />

                {errors.password && <FieldError errors={[errors.password]} />}
              </Field>

              <Controller
                name="acceptedTerms"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        aria-invalid={fieldState.invalid}
                        className="mt-0.5"
                      />

                      <div className="text-muted-foreground text-sm leading-snug">
                        <FieldLabel
                          htmlFor="terms"
                          className="inline font-normal"
                        >
                          Li e concordo com os{' '}
                        </FieldLabel>
                        {/* links provisorios */}
                        <Link
                          to="/termos"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground underline underline-offset-4"
                        >
                          Termos de uso
                        </Link>
                        {' e a '}
                        {/* links provisorios */}
                        <Link
                          to="/privacidade"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground underline underline-offset-4"
                        >
                          Política de privacidade
                        </Link>
                        .
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex-col gap-4 px-8 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-[hsl(var(--palette-6))] text-base font-semibold hover:bg-[hsl(var(--palette-7))]"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </Button>

            <div className="text-muted-foreground flex items-center text-sm">
              <span>Já tem conta?</span>

              <Button variant="link" asChild>
                <Link
                  to="/login"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  Entrar
                </Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
