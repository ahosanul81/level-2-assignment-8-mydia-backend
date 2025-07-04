"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const comment_validation_1 = require("./comment.validation");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const commentRouter = express_1.default.Router();
// commentRouter.get("/comments");
commentRouter.post("/add-comment/:ideaId", (0, validateRequest_1.validateRequest)(comment_validation_1.commentValidation.addComment), (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), comment_controller_1.commentController.addComment);
commentRouter.post("/add-reply-comment/:ideaId", (0, validateRequest_1.validateRequest)(comment_validation_1.commentValidation.addReply), (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), comment_controller_1.commentController.addReply);
commentRouter.delete("/delete-comment/:commentId", (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), comment_controller_1.commentController.deleteComment);
commentRouter.patch("/update-comment/:commentId", (0, validateRequest_1.validateRequest)(comment_validation_1.commentValidation.updateComment), (0, auth_1.auth)(client_1.UserRole.member, client_1.UserRole.admin), comment_controller_1.commentController.updateComment);
exports.default = commentRouter;
