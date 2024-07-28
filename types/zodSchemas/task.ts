import * as z from "zod";

export const taskPayloadSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  detail: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  dueDate: z.string().min(1, "Date is required"),
  type: z.string().optional(),
  order: z.number().optional(),
});

export const taskSchema = taskPayloadSchema.extend({
  id: z.string(),
  userId: z.string(),
  color: z.string(),
});
