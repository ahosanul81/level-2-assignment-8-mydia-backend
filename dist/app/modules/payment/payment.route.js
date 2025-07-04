"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const paymentRouter = express_1.default.Router();
//sslcommerz init
paymentRouter.get("/init/:ideaId/:memberId", payment_controller_1.paymentController.paymentPgae);
paymentRouter.get("/validate/:val_id", payment_controller_1.paymentController.paymentValidate);
paymentRouter.post("/success", payment_controller_1.paymentController.paymentSuccess);
paymentRouter.get("/fail", payment_controller_1.paymentController.paymentFail);
paymentRouter.get("/cancel", payment_controller_1.paymentController.paymentCancel);
paymentRouter.get("/completed", (0, auth_1.auth)(client_1.UserRole.admin), payment_controller_1.paymentController.getAllPaymentCompleted);
exports.default = paymentRouter;
