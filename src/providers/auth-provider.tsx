import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type AuthUser = {
  username: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (username: string, password: string) => Promise<string | null>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_USERNAME = 'user';
const DEMO_PASSWORD = 'user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = useCallback(async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 550));

    const isValid =
      username.trim().toLowerCase() === DEMO_USERNAME && password === DEMO_PASSWORD;

    if (!isValid) {
      return 'Usuario o contraseña incorrectos. Prueba con user / user.';
    }

    setUser({ username: DEMO_USERNAME });
    return null;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
