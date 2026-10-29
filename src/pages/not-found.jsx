import { SearchX } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button.jsx';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--palette-3)/0.45),transparent_60%)] px-4 py-10">
      <Card className="border-border bg-card w-full max-w-md gap-6 py-8 shadow-2xl shadow-black/40">
        <CardHeader className="gap-2 px-8">
          <div className="bg-primary/15 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
            <SearchX className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            <h1>Página não encontrada</h1>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            O endereço pode estar incorreto ou a página foi movida. Volte ao
            início para continuar.
          </CardDescription>
        </CardHeader>

        <CardFooter className="px-8">
          <Button
            asChild
            className="h-11 w-full bg-[hsl(var(--palette-6))] text-base font-semibold hover:bg-[hsl(var(--palette-7))]"
          >
            <Link to="/">Voltar ao início</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
