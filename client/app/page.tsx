"use client";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";

export default function TasksHome() {
  const { authLoading, user } = useUserState();

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user && !authLoading) {
    return redirect("/login");
  }

  return redirect("/tasks");
}
