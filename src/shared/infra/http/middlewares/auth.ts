import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CustomError } from "../../../errors/CustomError";
import { MeUserService } from "../../../../modules/users/services/MeUserService";
import { Authentication } from "../../../utils/Authentication";

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return res.status(401).json({ status: 401, error: "Token é necessário" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const authentication = container.resolve(Authentication);
    const meUserService = container.resolve(MeUserService);

    const { user } = authentication.getTokenData(token)
    const checkUser = await meUserService.execute(Number(user.id));

    req.user = checkUser;
    return next();
  } catch (error: any) {
    throw new CustomError(error?.message ?? "Token inválido", 401);
  }
};