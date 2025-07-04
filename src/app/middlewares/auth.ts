import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { jwtDecode } from "jwt-decode";
import { TJwtPayload } from "../interface/jwtPayload";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(404, "Token not found");
    }

    // const decoded = jwt.verify(token, config.jwt.access_token_secret as string);

    const decoded: TJwtPayload = jwtDecode(token);
    const { email, role, iat, exp } = decoded;
    const userData = await prisma.user.findUnique({
      where: { email },
      select: { role: true, email: true, status: true },
    });
    if (userData?.role && !roles?.includes(userData.role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized user"
      );
    }

    if (userData?.status !== "active") {
      throw new AppError(
        StatusCodes.CONFLICT,
        `You are unauthorized. You are ${userData?.status}`
      );
    }
    if (new Date().getTime() > exp * 1000) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Login session is expired");
    }
    req.user = { email, role };
    next();
  };
};
