import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.get("/api", (req, res) => {
  const response = {
    message: "API is up and running.",
  };
  res.status(200).send(response);
});

export default app;
