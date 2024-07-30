import "reflect-metadata";
import { Request, Response } from "express";
import { app } from "./server";
import "../container";
import "./typeorm";

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ status: "OK" });
});

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});