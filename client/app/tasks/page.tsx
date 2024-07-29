"use client";

import { AddOrUpdateTask } from "@/components/addOrUpdateTask";
import { Tasks } from "@/components/tasks";
import { axiosInstance } from "@/utils/axiosInstance";
import { db } from "@/utils/firebase";
import { useTasksState } from "@/zustand/tasks";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { Task } from "../../../types/task";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";

export default function TasksHome() {
  const { setTasks } = useTasksState();
  const { user } = useUserState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "tasks"), where("userId", "==", user?.uid)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(data as Task[]);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="p-4 w-full">
      <div className="mt-2 flex justify-between w-full sticky top-0">
        <p className="text-3xl font-bold">Task Wall</p>
        <AddOrUpdateTask mode="add" />
      </div>

      <Tasks />
    </div>
  );
}
