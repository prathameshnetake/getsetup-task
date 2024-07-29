import { User } from "firebase/auth";
import { create } from "zustand";

export interface IUserState {
  user?: User;
  authLoading: boolean;
  token: string;
  setUser: (user?: User) => void;
  setAuthLoading: (authLoading: boolean) => void;
  reset: () => void;
  setToken: (token: string) => void;
}

export const useUserState = create<IUserState>()((set) => ({
  user: undefined,
  authLoading: true,
  token: "",
  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  reset: () => set({ user: undefined, authLoading: true }),
  setToken: (token) => set({ token }),
}));
