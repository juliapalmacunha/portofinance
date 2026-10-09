import { LogOut, UserRound, WalletCards } from 'lucide-react';
import { useContext } from 'react';

import { Button } from '@/components/ui/button.jsx';
import { AuthContext } from '@/context/auth.jsx';

const Header = ({ user }) => {
  const { signout } = useContext(AuthContext);

  return (
    <header className="relative z-10 border-b border-white/10 bg-[#140C30]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#16A085]/15 text-[#16A085]">
            <WalletCards className="size-5" />
          </div>

          <span className="text-lg font-bold tracking-tight">
            Porto
            <span className="text-[#16A085]">Finance</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex size-9 items-center justify-center rounded-full border border-[#168777]/30 bg-[#168777]/10 text-[#16A085]">
              <UserRound className="size-4" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-medium text-white">
                {user.first_name} {user.last_name}
              </p>

              <p className="text-xs text-white/45">Minha conta</p>
            </div>
          </div>

          <div className="mx-1 hidden h-7 w-px bg-white/10 sm:block" />

          <Button
            type="button"
            variant="ghost"
            className="gap-2 text-white/60 hover:bg-white/5 hover:text-white"
            onClick={() => {
              signout();
            }}
          >
            <LogOut className="size-4" />

            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
