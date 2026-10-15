import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.jsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.jsx';
import { AuthContext } from '@/context/auth.jsx';

export const UserMenu = () => {
  const { user, signout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const menuRef = useRef(null);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLogoutRequest = () => {
    setIsMenuOpen(false);
    setIsLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutOpen(false);
    signout();
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="user-account-menu"
          aria-haspopup="true"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex min-w-44 items-center gap-3 bg-transparent px-4 py-3 text-left focus-visible:ring-2 focus-visible:ring-[#16A085]/50 focus-visible:outline-none"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#16A085]/10 text-[#16A085]">
            <Avatar className="size-9 border border-[#16A085]/20">
              <AvatarImage
                src={user?.avatar_url}
                alt={`Avatar de ${fullName}`}
                className="object-cover"
              />

              <AvatarFallback className="bg-[#16A085]/10 text-sm font-medium text-[#16A085]">
                {user?.firstName?.charAt(0)?.toUpperCase()}
                {user?.lastName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <span className="max-w-40 flex-1 truncate text-sm font-medium text-white/90">
            {fullName || 'Minha conta'}
          </span>

          <ChevronDown
            className={`size-4 shrink-0 text-white/50 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''} `}
          />
        </button>

        <div
          id="user-account-menu"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`absolute top-full right-0 z-50 w-full origin-top overflow-hidden rounded-b-xl bg-[#140C30] px-2 py-2 shadow-lg shadow-black/15 transition-all duration-200 ease-out ${
            isMenuOpen
              ? 'visible translate-y-0 scale-y-100 opacity-100'
              : 'invisible -translate-y-1 scale-y-95 opacity-0'
          } `}
        >
          <div className="border-t border-white/10 pt-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 transition-colors duration-150 hover:bg-[#16A085]/10 hover:text-[#16A085]"
            >
              <UserRound className="size-4" />
              <span>Meu perfil</span>
            </button>
            <div className="px-0.5 py-0.5">
              <button
                type="button"
                onClick={handleLogoutRequest}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 transition-colors duration-150 hover:bg-[#16A085]/10 hover:text-[#16A085] focus-visible:ring-2 focus-visible:ring-[#16A085]/50 focus-visible:outline-none"
              >
                <LogOut className="size-4" />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm gap-4 rounded-xl border border-white/10 bg-[#14253E] p-6 text-white shadow-2xl shadow-black/30">
          <AlertDialogHeader className="gap-2 text-left">
            <AlertDialogTitle className="text-base font-semibold text-white">
              Sair da conta?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-relaxed text-white/60">
              Você precisará fazer login novamente para acessar sua conta.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-2 gap-2 sm:justify-end">
            <AlertDialogCancel className="h-9 rounded-md border-white/10 bg-white/5 px-4 text-sm text-white/80 hover:bg-white/10 hover:text-white">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="h-9 rounded-md bg-[#168777] px-4 text-sm font-medium text-white hover:bg-[#16A085]"
            >
              Sim, sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
