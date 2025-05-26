import express from "express";
import { paymentController } from "./payment.controller";
const paymentRouter = express.Router();

//sslcommerz init
paymentRouter.get("/init/:ideaId/:memberId", paymentController.paymentPgae);
paymentRouter.get("/validate/:val_id", paymentController.paymentValidate);
paymentRouter.post("/success", paymentController.paymentSuccess);
paymentRouter.get("/fail", paymentController.paymentFail);
paymentRouter.get("/cancel", paymentController.paymentCancel);

export default paymentRouter;
