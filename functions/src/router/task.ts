import { Router, type Request, type Response } from "express";
import { Task } from "types/task";
import * as logger from "firebase-functions/logger";
import { Firestore } from "@google-cloud/firestore";
import { taskPayloadSchema } from "../../../types/zodSchemas/task";
import color from "randomcolor";

export const taskRouter = Router();
const firestore = new Firestore();

taskRouter.post("/", async (req: Request<Task>, res: Response) => {
  try {
    const task = req.body;

    // validate zod schema
    taskPayloadSchema.parse(task);
    const colorCode = color({ luminosity: "light" });
    logger.info(task);
    await firestore.collection("tasks").add({ ...task, color: colorCode });
    res.json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

taskRouter.get("/", async (req: Request, res: Response) => {
  try {
    const snapshot = await firestore.collection("tasks").get();
    const tasks = snapshot.docs.map((doc) => {
      const task = doc.data() as Task;
      return { ...task, id: doc.id } as Task;
    });
    res.json(tasks);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

taskRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await firestore.collection("tasks").doc(id).delete();
    res.json({ id });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});
