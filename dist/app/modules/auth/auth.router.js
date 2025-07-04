"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authRouter = express_1.default.Router();
authRouter.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.authValidation.login), auth_controller_1.authController.login);
exports.default = authRouter;
