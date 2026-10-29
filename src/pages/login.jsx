import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.jsx';
import { Input } from '@/components/ui/input.jsx';
import { AuthContext } from '@/context/auth.jsx';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),

  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

const LoginPage = () => {
  const { login, loadingLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--palette-3)/0.45),transparent_60%)] px-4 py-10">
      <Card className="border-border bg-card w-full max-w-md gap-6 py-8 shadow-2xl shadow-black/40">
        <CardHeader className="gap-2 px-8">
          <div
            className="bg-primary/15 text-primary mb-2 flex size-10 items-center justify-center rounded-lg"
            aria-hidden="true"
          >
            <ShieldCheck className="size-5" />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            <h1>Entre na sua conta</h1>
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Acesse o Portofinance com seu e-mail e sua senha.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="mb-5 px-8">
            <FieldGroup>
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
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>

                  <Button
                    variant="link"
                    size="sm"
                    asChild
                    className="h-auto p-0"
                  >
                    <Link
                      to="/esqueci-senha"
                      className="text-muted-foreground hover:text-foreground text-sm underline-offset-4"
                    >
                      Esqueci minha senha
                    </Link>
                  </Button>
                </div>

                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />

                {errors.password && <FieldError errors={[errors.password]} />}
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex-col gap-4 px-8 pt-6">
            <Button
              type="submit"
              disabled={loadingLogin}
              className="h-11 w-full bg-[hsl(var(--palette-6))] text-base font-semibold hover:bg-[hsl(var(--palette-7))]"
            >
              {loadingLogin ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-muted-foreground flex items-center text-sm">
              <span>Ainda não tem conta?</span>

              <Link
                to="/signup"
                className="text-primary ml-1.5 font-semibold underline-offset-4 hover:underline"
              >
                Criar conta
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
