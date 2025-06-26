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
    success: true,
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
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});
const updateUserStatus = catchAsync(async (req, res) => {
  const result = await userService.updateUserStatusIntoDB(
    req.params.userId as string,
    req.body
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await userService.getMeFromDB(req.params.userEmail as string);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Get me fetched successfully",
    data: result,
  });
});
export const userController = {
  createAdmin,
  createMember,
  getMemberByEmail,
  getAllUser,
  updateUserStatus,
  getMe,
};
