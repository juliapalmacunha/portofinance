import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: chamar a API de login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--palette-3)/0.45),transparent_60%)] px-4 py-10">
      <Card className="border-border bg-card w-full max-w-md gap-6 py-8 shadow-2xl shadow-black/40">
        <CardHeader className="gap-2 px-8">
          <div className="bg-primary/15 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            <h1>Entre na sua conta</h1>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Acesse o Portofinance com seu e-mail e sua senha.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                required
                className="bg-background/60 h-11"
              />
            </div>

            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                  <Link
                    to="/esqueci-senha"
                    className="text-muted-foreground hover:text-foreground text-sm underline-offset-4"
                  >
                    Esqueci minha senha
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  required
                  className="bg-background/60 h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4 px-8 pt-6">
            <Button
              type="submit"
              className="h-11 w-full bg-[hsl(var(--palette-6))] text-base font-semibold hover:bg-[hsl(var(--palette-7))]"
            >
              Entrar
            </Button>

            <div className="text-muted-foreground flex items-center text-sm">
              <p>Ainda não tem conta?</p>
              <Button variant="link" asChild>
                <Link
                  to="/signup"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  Criar conta
                </Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
