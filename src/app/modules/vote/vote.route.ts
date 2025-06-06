import express from "express";
import { voteController } from "./vote.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const voteRouter = express.Router();

voteRouter.post(
  "/up-vote/:ideaId",
  auth(UserRole.member, UserRole.admin),
  voteController.upVote
);
voteRouter.post(
  "/dwon-vote/:ideaId",
  auth(UserRole.member, UserRole.admin),
  voteController.downVote
);
voteRouter.get(
  "/vote-count/:ideaId",
  auth(UserRole.member, UserRole.admin),
  voteController.voteCount
);

export default voteRouter;
