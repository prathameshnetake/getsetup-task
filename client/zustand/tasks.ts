import { create } from "zustand";
import { Task } from "../../types/task";

export interface ITaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  reset: () => void;
  updateTask: (id: string, task: Task) => void;
}

export const useTasksState = create<ITaskState>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  reset: () => set({ tasks: [] }),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),
}));
