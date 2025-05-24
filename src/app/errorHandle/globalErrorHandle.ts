import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ZodError, ZodIssue } from "zod";

type TErrorSources = {
  path: string | number;
  message: string;
};

export const globalErrorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  let statusCode = 500;
  let message = "something went wrong";
  let errorSources: TErrorSources[] = [{ path: "", message: "" }];

  if (error instanceof ZodError) {
    message = "zodError";
    statusCode = 400;
    errorSources = error.issues?.map(
      (issue: ZodIssue): TErrorSources => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      })
    );
  }

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
  });
};
