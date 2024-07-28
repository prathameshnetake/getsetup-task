import { create } from "zustand";

interface IAddTaskState {
  title: string;
  detail: string;
  dueDate: Date;
  type: string;
  order: number;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (dueDate: Date) => void;
  setType: (type: string) => void;
  setOrder: (order: number) => void;
  reset: () => void;
}

export const useAddTaskState = create<IAddTaskState>()((set) => ({
  title: "",
  detail: "",
  dueDate: new Date(),
  type: "",
  order: 0,
  setTitle: (title) => set({ title }),
  setDescription: (detail) => set({ detail }),
  setDueDate: (dueDate) => set({ dueDate }),
  setType: (type) => set({ type }),
  setOrder: (order) => set({ order }),
  reset: () =>
    set({
      title: "",
      detail: "",
      dueDate: new Date(),
      type: "",
      order: 0,
    }),
}));
