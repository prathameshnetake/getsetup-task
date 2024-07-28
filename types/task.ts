import * as z from "zod";
import { taskSchema } from "./zodSchemas/task";

export interface TaskPayload {
  title: string;
  details: string;
  date: string;
  type: string;
  order: number;
}

export type Task = z.infer<typeof taskSchema>;
