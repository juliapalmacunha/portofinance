import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  login: () => {},
  signup: () => {},
});
