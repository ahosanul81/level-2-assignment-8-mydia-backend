import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(authValidation.login),
  authController.login
);

export default authRouter;
