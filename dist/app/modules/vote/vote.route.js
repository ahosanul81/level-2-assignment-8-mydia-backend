"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vote_controller_1 = require("./vote.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const voteRouter = express_1.default.Router();
voteRouter.post("/up-vote/:ideaId", (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), vote_controller_1.voteController.upVote);
voteRouter.post("/dwon-vote/:ideaId", (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), vote_controller_1.voteController.downVote);
voteRouter.get("/vote-count/:ideaId", (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), vote_controller_1.voteController.voteCount);
exports.default = voteRouter;
