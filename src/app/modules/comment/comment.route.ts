import express from "express";
import { commentController } from "./comment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { commentValidation } from "./comment.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const commentRouter = express.Router();

// commentRouter.get("/comments");

commentRouter.post(
  "/add-comment/:ideaId",
  validateRequest(commentValidation.addComment),
  auth(UserRole.member, UserRole.admin),
  commentController.addComment
);
commentRouter.post(
  "/add-reply-comment/:ideaId",
  validateRequest(commentValidation.addReply),
  auth(UserRole.member, UserRole.admin),
  commentController.addReply
);
commentRouter.delete(
  "/delete-comment/:commentId",
  auth(UserRole.member, UserRole.admin),
  commentController.deleteComment
);
commentRouter.patch(
  "/update-comment/:commentId",
  validateRequest(commentValidation.updateComment),
  auth(UserRole.member, UserRole.admin),
  commentController.updateComment
);

export default commentRouter;
