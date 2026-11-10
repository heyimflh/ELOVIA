'use client';

import React, { createContext, useContext } from 'react';
import { useMitraState } from './useMitraState';

type MitraContextType = ReturnType<typeof useMitraState>;

const MitraContext = createContext<MitraContextType | null>(null);

export function MitraProvider({ children }: { children: React.ReactNode }) {
  const state = useMitraState();
  return <MitraContext.Provider value={state}>{children}</MitraContext.Provider>;
}

export function useMitra() {
  const context = useContext(MitraContext);
  if (!context) {
    throw new Error('useMitra must be used within a MitraProvider');
  }
  return context;
}

