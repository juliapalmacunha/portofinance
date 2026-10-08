import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { useContext } from 'react';
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
import { AuthContext } from '@/context/auth.jsx';

const signupSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(1, 'O nome é obrigatório')
      .min(2, 'O nome deve ter pelo menos 2 caracteres'),

    last_name: z
      .string()
      .trim()
      .min(1, 'O sobrenome é obrigatório')
      .min(2, 'O sobrenome deve ter pelo menos 2 caracteres'),

    email: z.email('E-mail inválido'),

    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),

    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),

    acceptedTerms: z.literal(true, {
      error: 'Você precisa aceitar os termos de uso',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const SignupPage = () => {
  const { user, signup, loadingLogin } = useContext(AuthContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },

    mode: 'onTouched',
  });

  const onSubmit = (formData) => {
    const data = { ...formData };

    delete data.acceptedTerms;
    delete data.confirmPassword;

    signup(data);
  };

  if (user) {
    return (
      <p>
        Bem-vindo, {user.first_name} {user.last_name}! Sua conta foi criada com
        sucesso.
      </p>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--palette-3)/0.45),transparent_60%)] px-4 py-5">
      <Card className="border-border bg-card w-full max-w-lg gap-4 py-6 shadow-2xl shadow-black/40">
        <CardHeader className="gap-2 px-8">
          <div
            className="bg-primary/15 text-primary mb-1 flex size-10 items-center justify-center rounded-lg"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="first_name">Nome</FieldLabel>

                  <Input
                    id="first_name"
                    autoComplete="given-name"
                    placeholder="João"
                    aria-invalid={!!errors.first_name}
                    className="bg-background/60 h-11"
                    {...register('first_name')}
                  />

                  {errors.first_name && (
                    <FieldError errors={[errors.first_name]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="last_name">Sobrenome</FieldLabel>

                  <Input
                    id="last_name"
                    autoComplete="family-name"
                    placeholder="Silva"
                    aria-invalid={!!errors.last_name}
                    className="bg-background/60 h-11"
                    {...register('last_name')}
                  />

                  {errors.last_name && (
                    <FieldError errors={[errors.last_name]} />
                  )}
                </Field>
              </div>

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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>

                  <PasswordInput
                    id="password"
                    autoComplete="new-password"
                    placeholder="Mínimo de 8"
                    aria-invalid={!!errors.password}
                    {...register('password')}
                  />

                  {errors.password && <FieldError errors={[errors.password]} />}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirmar senha
                  </FieldLabel>

                  <PasswordInput
                    id="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                    aria-invalid={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />

                  {errors.confirmPassword && (
                    <FieldError errors={[errors.confirmPassword]} />
                  )}
                </Field>
              </div>

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
                        <Link
                          to="/termos"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground underline underline-offset-4"
                        >
                          Termos de uso
                        </Link>
                        {' e a '}
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

          <CardFooter className="flex-col gap-3 px-8 pt-2">
            <Button
              type="submit"
              disabled={loadingLogin}
              className="h-11 w-full bg-[hsl(var(--palette-6))] text-base font-semibold hover:bg-[hsl(var(--palette-7))]"
            >
              {loadingLogin ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-muted-foreground flex items-center text-sm">
              <span>Já tem conta?</span>

              <Link
                to="/login"
                className="text-primary ml-1.5 font-semibold underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
