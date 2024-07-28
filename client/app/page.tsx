"use client";

import { AddTask } from "@/components/addTask";
import { Tasks } from "@/components/tasks";
import { axiosInstance } from "@/utils/axiosInstance";
import { useTasksState } from "@/zustand/tasks";
import { useEffect } from "react";

export default function Home() {
  const { setTasks } = useTasksState();
  const loadTasks = async () => {
    const response = await axiosInstance.get("/task");
    setTasks(response.data);
  };
  // load all the tasks
  useEffect(() => {
    try {
      loadTasks().then(() => console.log("Tasks loaded"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="p-4 w-full">
      <div className="mt-2 flex justify-between w-full">
        <p className="text-3xl font-bold">Task Wall</p>
        <AddTask />
      </div>

      <Tasks />
    </div>
  );
}
