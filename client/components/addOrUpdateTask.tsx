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
import { CalendarPlus2, PencilLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "./calendarPicker";
import { useCallback, useEffect } from "react";
import { useAddTaskState } from "@/zustand/addTask";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Task } from "../../types/task";

export interface IAddOrUpdateTaskProps {
  mode: "add" | "update";
  task?: Task;
}

export const AddOrUpdateTask: React.FC<IAddOrUpdateTaskProps> = ({
  mode,
  task,
}) => {
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
    try {
      const result = await axiosInstance.post("/task", {
        title,
        detail,
        dueDate: dueDate.toISOString(),
      });
      reset();
      toast.success("Task added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding task");
    }
  }, [title, detail, dueDate, order, type]);

  const updateTask = useCallback(async () => {
    try {
      const result = await axiosInstance.put(`/task/${order}`, {
        title,
        detail,
        dueDate: dueDate.toISOString(),
      });
      console.log(result);
      reset();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating task");
    }
  }, [title, detail, dueDate, order, type]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {mode === "add" ? (
          <Button>
            <CalendarPlus2 className="mr-3" />
            <p>Add Task</p>
          </Button>
        ) : (
          <Button className="h-5 w-5 p-[4px]">
            <PencilLine className="text-sm " />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {mode === "add" ? (
            <SheetTitle>Add new task</SheetTitle>
          ) : (
            <SheetTitle>Update task</SheetTitle>
          )}
          {mode === "add" ? (
            <SheetDescription>Add new task to your list</SheetDescription>
          ) : (
            <SheetDescription>Update task details</SheetDescription>
          )}
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
            {mode === "add" ? (
              <Button onClick={addTask}>Add task</Button>
            ) : (
              <Button onClick={updateTask}>Update Task</Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
