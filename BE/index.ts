import express, { json } from "express";
import generateRoute from "./maincode/code.ts";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",generateRoute)

app.listen(3000);