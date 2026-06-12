import React, { createContext, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

type AuthContextValue = {
  isAuthed: boolean;
  login: (params?: { email?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthed,
      login: () => setIsAuthed(true),
      logout: () => setIsAuthed(false),
    }),
    [isAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}

