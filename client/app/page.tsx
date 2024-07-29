"use client";

import { AddOrUpdateTask } from "@/components/addOrUpdateTask";
import { Tasks } from "@/components/tasks";
import { axiosInstance } from "@/utils/axiosInstance";
import { db } from "@/utils/firebase";
import { useTasksState } from "@/zustand/tasks";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Task } from "../../types/task";

export default function Home() {
  const { setTasks } = useTasksState();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(data as Task[]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 w-full">
      <div className="mt-2 flex justify-between w-full">
        <p className="text-3xl font-bold">Task Wall</p>
        <AddOrUpdateTask mode="add" />
      </div>

      <Tasks />
    </div>
  );
}
