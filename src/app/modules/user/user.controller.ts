import { IFile } from "../../interface/fileType";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(
    req.files as IFile[],
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Admin created successfully",
    data: result,
  });
});

const createMember = catchAsync(async (req, res) => {
  const result = await userService.createMemberIntoDB(
    req.files as IFile[],
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Member created successfully",
    data: result,
  });
});
const getMemberByEmail = catchAsync(async (req, res) => {
  const result = await userService.getUserByEmailFromDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Member fetched successfully",
    data: result,
  });
});
export const userController = { createAdmin, createMember, getMemberByEmail };
