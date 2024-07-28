import { useTasksState } from "@/zustand/tasks";
import { SingleTask } from "./singleTask";

export const Tasks: React.FC = () => {
  const { tasks } = useTasksState();
  return (
    <div className="grid grid-cols-4 my-8">
      <div className="col-span-3 grid gap-4">
        {tasks.map((task) => (
          <SingleTask key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};
