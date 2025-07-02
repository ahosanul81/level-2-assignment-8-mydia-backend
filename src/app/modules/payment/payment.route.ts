import express from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const paymentRouter = express.Router();

//sslcommerz init
paymentRouter.get("/init/:ideaId/:memberId", paymentController.paymentPgae);
paymentRouter.get("/validate/:val_id", paymentController.paymentValidate);
paymentRouter.post("/success", paymentController.paymentSuccess);
paymentRouter.get("/fail", paymentController.paymentFail);
paymentRouter.get("/cancel", paymentController.paymentCancel);

paymentRouter.get(
  "/completed",
  auth(UserRole.admin),
  paymentController.getAllPaymentCompleted
);
export default paymentRouter;
