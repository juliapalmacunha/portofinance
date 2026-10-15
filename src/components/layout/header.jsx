import { WalletCards } from 'lucide-react';

import { UserMenu } from './user-menu.jsx';

const Header = () => {
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#140C30]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#16A085]/15 text-[#16A085]">
            <WalletCards className="size-5" />
          </div>

          <span className="text-lg font-bold tracking-tight text-white">
            Porto
            <span className="text-[#16A085]">Finance</span>
          </span>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
