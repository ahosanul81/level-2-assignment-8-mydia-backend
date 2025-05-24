import { PrismaClient } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
const prisma = new PrismaClient();

const loginIntoDB = async (payload: { email: string; password: string }) => {
  //   console.log(payload);
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });
  if (!user) {
    throw new AppError(404, "This user not found");
  }
  if (user && !bcrypt.compareSync(password, user.password)) {
    throw new AppError(
      StatusCodes.MISDIRECTED_REQUEST,
      "Password does not match"
    );
  }
  if (user && user.status !== "active") {
    throw new AppError(StatusCodes.UNAUTHORIZED, `This user ${user.status}`);
  }

  const jwtData = {
    email: payload.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtData,
    config.jwt.access_token_secret as Secret,
    {
      expiresIn: "15d",
    }
  );
  const refreshToken = jwt.sign(
    jwtData,
    config.jwt.refresh_token_secret as Secret,
    {
      expiresIn: "60d",
    }
  );

  return { accessToken, refreshToken };
};

export const authSerivice = { loginIntoDB };
