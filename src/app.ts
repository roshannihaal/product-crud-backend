import express, { json } from "express";
import cors from "cors";
import { apiRouter } from "./api";
import { errorHandler, notFound } from "./middlewares";

const app = express();

app.use(json());
app.use(cors());

app.get("/api", (req, res) => {
  const response = {
    message: "API is up and running.",
  };
  res.status(200).send(response);
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
