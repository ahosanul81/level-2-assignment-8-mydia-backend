import { catchAsync } from "../../utils/catchAsync";
import { authSerivice } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await authSerivice.loginIntoDB(req.body);
  res.cookie("refreshToken", result.refreshToken);
  res.status(200).json({
    statusCode: 200,
    message: "logged in successfully",
    data: result,
  });
});

export const authController = { login };
