import { Request, Response } from "express";
import "reflect-metadata";

import { app } from "./server";

import "@shared/container";

import "./typeorm";

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ status: "OK" });
});

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ status: "OK" });
});

app.listen(process.env.PORT, () => {
  console.info(`Server started on port ${process.env.PORT}`);
});
