import express from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const categoryRouter = express.Router();
categoryRouter.get(
  "/",
  auth(UserRole.admin, UserRole.member),
  categoryController.getAllCategory
);
categoryRouter.post(
  "/create-category",
  auth(UserRole.admin),
  categoryController.createCategory
);

export default categoryRouter;
