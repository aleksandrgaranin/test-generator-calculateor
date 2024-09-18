"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type NameStore, createNameStore } from "@/stores/store";

export type NameStoreApi = ReturnType<typeof createNameStore>;

export const NameStoreContext = createContext<NameStoreApi | undefined>(
  undefined
);

export interface NameStoreProviderProps {
  children: ReactNode;
}

export const NameStoreProvider = ({ children }: NameStoreProviderProps) => {
  const storeRef = useRef<NameStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createNameStore();
  }

  return (
    <NameStoreContext.Provider value={storeRef.current}>
      {children}
    </NameStoreContext.Provider>
  );
};

export const useNameStore = <T,>(selector: (store: NameStore) => T): T => {
  const nameStoreContext = useContext(NameStoreContext);

  if (!nameStoreContext) {
    throw new Error(`useNameStore must be used within CounterStoreProvider`);
  }

  return useStore(nameStoreContext, selector);
};
