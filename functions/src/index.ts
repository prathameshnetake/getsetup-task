import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import { taskRouter } from "./router/task";
import * as cors from "cors";

const serviceAccount = require("../getsetup-assignment-a8fa14924666.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());

app.use("/task", taskRouter);

export const main = functions.https.onRequest(app);
