import express, { NextFunction, Request, Response } from "express";
import userRouter from "./app/modules/user/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { globalErrorHandle } from "./app/errorHandle/globalErrorHandle";
import authRouter from "./app/modules/auth/auth.router";
import categoryRouter from "./app/modules/category/category.route";
import ideaRouter from "./app/modules/idea/idea.route";
import commentRouter from "./app/modules/comment/comment.route";
import voteRouter from "./app/modules/vote/vote.route";
import paymentRouter from "./app/modules/payment/payment.route";
// import paymentRouter from "./app/modules/payment/payment.route";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/ideas", ideaRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/votes", voteRouter);
app.use("/api/v1/payment", paymentRouter);

app.use(globalErrorHandle);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "API not found",
    errorSources: [
      { path: req.originalUrl, message: "Your requested path not found" },
    ],
  });
});
export default app;
