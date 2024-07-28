import { create } from "zustand";
import { Task } from "../../types/task";

export interface ITaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  reset: () => void;
}

export const useTasksState = create<ITaskState>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  reset: () => set({ tasks: [] }),
}));
