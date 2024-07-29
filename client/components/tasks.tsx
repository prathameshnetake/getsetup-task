import { useTasksState } from "@/zustand/tasks";
import { SingleTask } from "./singleTask";
import {
  DragDropContext,
  OnDragEndResponder,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useCallback } from "react";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const Tasks: React.FC = () => {
  const { tasks, setTasks } = useTasksState();

  const onDragEnd = useCallback<OnDragEndResponder>(
    (result) => {
      if (!result.destination) {
        return;
      }

      const items = reorder(
        tasks,
        result.source.index,
        result.destination.index
      );

      setTasks([...items]);
    },
    [tasks]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid my-8 items-center justify-center col-span-2 w-full"
          >
            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className=""
                    >
                      <SingleTask key={task.id} {...task} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
