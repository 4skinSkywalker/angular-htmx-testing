import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
}));

app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(4000, () => console.log("Listening on port 4000"));
