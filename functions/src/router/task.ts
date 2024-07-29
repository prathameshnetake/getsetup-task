import {Router, type Request, type Response} from "express";
import {Task} from "types/task";
import * as logger from "firebase-functions/logger";
import {Firestore} from "@google-cloud/firestore";
import {taskPayloadSchema} from "../../../types/zodSchemas/task";
import {generateExtraLightColor} from "../../utils/color";
import {checkIfAuthenticated} from "../middleware/auth";

export const taskRouter = Router();
const firestore = new Firestore();

taskRouter.use(checkIfAuthenticated);

taskRouter.post("/", async (req: Request<Task>, res: Response) => {
  try {
    const task = req.body;

    // validate zod schema
    taskPayloadSchema.parse(task);
    const colorCode = generateExtraLightColor();
    logger.info(task);
    await firestore
      .collection("tasks")
      .add({...task, color: colorCode, userId: req.uid});
    res.json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

taskRouter.get("/", async (req: Request, res: Response) => {
  try {
    const snapshot = await firestore
      .collection("tasks")
      .where("userId", "==", req.uid)
      .get();
    const tasks = snapshot.docs.map((doc) => {
      const task = doc.data() as Task;
      return {...task, id: doc.id} as Task;
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
    res.json({id});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

taskRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = req.body;
    taskPayloadSchema.parse(task);
    await firestore.collection("tasks").doc(id).set(task);
    res.json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});
