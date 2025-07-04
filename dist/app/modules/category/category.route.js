"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const categoryRouter = express_1.default.Router();
categoryRouter.get("/", (0, auth_1.auth)(client_1.UserRole.admin, client_1.UserRole.member), category_controller_1.categoryController.getAllCategory);
categoryRouter.post("/create-category", (0, auth_1.auth)(client_1.UserRole.admin), category_controller_1.categoryController.createCategory);
exports.default = categoryRouter;
