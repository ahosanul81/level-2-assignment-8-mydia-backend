import express from "express";
import { voteController } from "./vote.controller";

const voteRouter = express.Router();

voteRouter.post("/up-vote/:ideaId", voteController.upVote);
voteRouter.post("/dwon-vote/:ideaId", voteController.downVote);
export default voteRouter;
