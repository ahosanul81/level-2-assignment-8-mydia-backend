import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/imageUploadToCloudinary";
import { bodyParser } from "../../utils/bodyParser";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const userRouter = express.Router();

userRouter.post(
  "/create-admin",
  upload.array("files"),
  bodyParser,
  validateRequest(userValidation.createAdmin),
  userController.createAdmin
);
userRouter.post(
  "/create-member",
  upload.array("files"),
  bodyParser,
  validateRequest(userValidation.createMember),
  userController.createMember
);
userRouter.post(
  "/user",
  // auth(UserRole.admin, UserRole.member),
  userController.getMemberByEmail
);
userRouter.get(
  "/",
  auth(UserRole.admin, UserRole.member),
  userController.getAllUser
);
userRouter.patch(
  "/update/user-status/:userId",
  auth(UserRole.admin),
  userController.updateUserStatus
);
userRouter.get(
  "/me/:userEmail",
  auth(UserRole.admin, UserRole.member),
  userController.getMe
);

export default userRouter;
