import express from "express";
import { ideaController } from "./idea.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ideaValidation } from "./idea.validation";
import { upload } from "../../utils/imageUploadToCloudinary";
import { bodyParser } from "../../utils/bodyParser";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const ideaRouter = express.Router();

ideaRouter.get("/", ideaController.getAllIdea);
ideaRouter.get("/:ideaId", ideaController.getIdeaById);
ideaRouter.post(
  "/add-idea",
  auth(UserRole.member),
  upload.array("files"),
  bodyParser,
  validateRequest(ideaValidation.add),
  ideaController.addIdea
);
ideaRouter.patch(
  "/update-idea/:ideaId",
  auth(UserRole.member),
  upload.array("files"),
  bodyParser,
  validateRequest(ideaValidation.update),
  ideaController.updateIdea
);
ideaRouter.delete(
  "/delete-idea/:ideaId",
  auth(UserRole.member, UserRole.admin),
  ideaController.deleteIdea
);
ideaRouter.patch(
  "/update-idea-status/:ideaId",
  validateRequest(ideaValidation.updateIdeaStatus),
  auth(UserRole.admin),
  ideaController.updateIdeaStatus
);

export default ideaRouter;
