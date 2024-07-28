import { Router, type Request, type Response } from "express";
import { Task } from "types/task";
import * as logger from "firebase-functions/logger";
import { Firestore } from "@google-cloud/firestore";
import { taskPayloadSchema } from "../../../types/zodSchemas/task";

export const taskRouter = Router();
const firestore = new Firestore();

taskRouter.post("/", async (req: Request<Task>, res: Response) => {
  try {
    const task = req.body;

    // validate zod schema
    taskPayloadSchema.parse(task);
    logger.info(task);
    await firestore.collection("tasks").add(task);
    res.json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});
