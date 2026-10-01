import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input.jsx';

const PasswordInput = ({
  id,
  autoComplete,
  placeholder,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`bg-background/60 h-11 pr-11 ${className}`}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        aria-pressed={showPassword}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {showPassword ? (
          <EyeOff className="size-4" aria-hidden="true" />
        ) : (
          <Eye className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
