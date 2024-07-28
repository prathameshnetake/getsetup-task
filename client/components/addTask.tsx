"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarPlus2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "./calendarPicker";
import { useCallback } from "react";
import { useAddTaskState } from "@/zustand/addTask";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";

export const AddTask: React.FC = () => {
  const {
    detail,
    dueDate,
    order,
    title,
    type,
    setDescription,
    setDueDate,
    setOrder,
    setTitle,
    setType,
    reset,
  } = useAddTaskState();

  const addTask = useCallback(async () => {
    console.log("add task to the list");
    try {
      const result = await axiosInstance.post("/task", {
        title,
        detail,
        dueDate: dueDate.toISOString(),
      });

      console.log(result);
      reset();
      toast.success("Task added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding task");
    }
  }, [title, detail, dueDate, order, type]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <CalendarPlus2 className="mr-3" />
          <p>Add Task</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new task</SheetTitle>
          <SheetDescription>Add new task to your list</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="taskName"
              placeholder="Email A/B Tests"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4  gap-4">
            <Label htmlFor="username" className="text-right">
              Details
            </Label>
            <Textarea
              placeholder="Task details goes here..."
              className="col-span-3 h-[200px]"
              value={detail}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4  gap-4">
            <Label htmlFor="username" className="text-right">
              Due Date
            </Label>
            <DatePicker
              date={dueDate}
              setDate={(value) => setDueDate(new Date())}
            />
          </div>
          <div className="grid grid-cols-4  gap-4">
            <Label htmlFor="username" className="text-right">
              Add to list (optional)
            </Label>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={addTask}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
