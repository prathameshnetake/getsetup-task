import * as functions from "firebase-functions";
import express from "express";
import * as admin from "firebase-admin";
import { taskRouter } from "./router/task";
import cors from "cors";

const serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors({ origin: true }));

app.use("/task", taskRouter);

export const getsetup = functions.https.onRequest(app);
