import * as z from "zod";
import { taskSchema, taskPayloadSchema } from "./zodSchemas/task";

export type TaskPayload = z.infer<typeof taskPayloadSchema>;

export type Task = z.infer<typeof taskSchema>;
