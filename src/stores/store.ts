import { createStore } from "zustand/vanilla";

export type NameState = {
  user: {
    fullName: string;
  };
};

export type NameActions = {
  setName: (newName: string) => void;
};

export type NameStore = NameState & NameActions;

export const defaultInitState: NameState = {
  user: {
    fullName: "",
  },
};

export const createNameStore = (initState: NameState = defaultInitState) => {
  return createStore<NameStore>()((set) => ({
    ...initState,
    setName: (newName: string) =>
      set((state) => ({ user: { fullName: newName } })),
  }));
};
