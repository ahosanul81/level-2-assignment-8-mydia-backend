"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const imageUploadToCloudinary_1 = require("../../utils/imageUploadToCloudinary");
const bodyParser_1 = require("../../utils/bodyParser");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const userRouter = express_1.default.Router();
userRouter.post("/create-admin", imageUploadToCloudinary_1.upload.array("files"), bodyParser_1.bodyParser, (0, validateRequest_1.validateRequest)(user_validation_1.userValidation.createAdmin), user_controller_1.userController.createAdmin);
userRouter.post("/create-member", imageUploadToCloudinary_1.upload.array("files"), bodyParser_1.bodyParser, (0, validateRequest_1.validateRequest)(user_validation_1.userValidation.createMember), user_controller_1.userController.createMember);
userRouter.post("/user", 
// auth(UserRole.admin, UserRole.member),
user_controller_1.userController.getMemberByEmail);
userRouter.get("/", (0, auth_1.auth)(client_1.UserRole.admin, client_1.UserRole.member), user_controller_1.userController.getAllUser);
userRouter.patch("/update/user-status/:userId", (0, auth_1.auth)(client_1.UserRole.admin), user_controller_1.userController.updateUserStatus);
userRouter.get("/me/:userEmail", (0, auth_1.auth)(client_1.UserRole.admin, client_1.UserRole.member), user_controller_1.userController.getMe);
exports.default = userRouter;
