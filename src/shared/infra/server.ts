import "reflect-metadata";
import { errors } from "celebrate";
import rTracer from "cls-rtracer";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { v4 as uuidv4 } from "uuid";
import { routes } from "./http/routes";
import swaggerOutput from "./swagger.json";
import responseTime from "response-time";
import { CustomError } from "../errors/CustomError";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(
  rTracer.expressMiddleware({
    requestIdFactory: req => req?.headers["x-amzn-trace-id"] || uuidv4(),
  }),
);

app.use((req, res, next) => {
  console.info(
    { method: req?.method },
    { endpoint: req?.url },
    { params: req?.params },
    { query: req?.query },
    { body: req?.body },
  );
  next();
});

app.use(responseTime((req: any, res, time) => {
  console.info(
    { method: req?.method },
    { endpoint: req?.originalUrl },
    { responseTime: Math.round(time) },
  );
}));

app.use(routes);
app.use(errors());

app.use((err: Error | any, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    console.warn(`${err.message}`, err);

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.type === "entity.parse.failed") {
    console.warn("Invalid body", err);

    return res.status(400).json({
      status: "error",
      message: "Invalid body",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export { app };