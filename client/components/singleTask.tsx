import { useCallback, useEffect } from "react";
import { Task } from "../../types/task";
import { db } from "../utils/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useTasksState } from "@/zustand/tasks";
import { AddOrUpdateTask } from "./addOrUpdateTask";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";

export const SingleTask: React.FC<Task> = (props) => {
  const { color, title, detail, id } = props;
  const { updateTask } = useTasksState();

  useEffect(() => {
    const docRef = doc(db, "tasks", id);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        updateTask(id, doc.data() as Task);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe(); // Cleanup function to detach listener
  }, []);

  const deleteTask = async () => {
    try {
      const res = await axiosInstance.delete(`/task/${id}`);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task");
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      toast.error("Are you sure you want to delete this task?", {
        action: {
          label: "Yes",
          onClick: () => deleteTask(),
        },
        cancel: {
          label: "Cancel",
          onClick: () => console.log("Cancel!"),
        },
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task");
    }
  }, [id]);

  return (
    <div
      className="grid rounded-lg shadow-md p-8 min-w-[350px]"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between">
        <p className="text-xl font-bold">{title}</p>
        <div className="grid grid-cols-2 gap-2">
          <AddOrUpdateTask mode="update" task={{ ...props }} key={id} />
          <Button className="h-5 w-5 p-[4px]" onClick={handleDelete}>
            <Trash2 className="text-sm " />
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm">{detail}</p>
    </div>
  );
};
