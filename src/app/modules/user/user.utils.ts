import { PrismaClient, UserStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
const prisma = new PrismaClient();

const userValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.userData.email },
    });
    if (user?.status !== "active") {
      console.log(user?.status);
    }

    return user;
  } catch (error) {
    next(error);
  }
};
