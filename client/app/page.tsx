import { AddTask } from "@/components/addTask";
import { Button } from "@/components/ui/button";
import { CalendarPlus2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4 w-full">
      <div className="mt-2 flex justify-between w-full">
        <p className="text-3xl font-bold">Task Wall</p>
        <AddTask />
      </div>
    </div>
  );
}
