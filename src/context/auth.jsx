import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isSigningUp: false,
  loadingSignup: false,
  loadingLogin: false,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signout: () => {},
});
