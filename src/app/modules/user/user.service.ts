import bcrypt from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { IFile } from "../../interface/fileType";
import { imageUploadToCloudinary } from "../../utils/imageUploadToCloudinary";
import { StatusCodes } from "http-status-codes";
import { IMember } from "./user.types";

const prisma = new PrismaClient();

const createAdminIntoDB = async (files: IFile[], payload: any) => {
  const { password, userData } = payload;

  const isexistUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (isexistUser && isexistUser) {
    throw new AppError(401, "This user already exist");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    const userInfo = {
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      role: UserRole.admin,
    };
    const createUser = await transactionClient.user.create({ data: userInfo });

    const adminData = {
      ...userData,
      userId: createUser.id,
    };
    if (files) {
      const profilePhoto = await imageUploadToCloudinary(files);

      if (profilePhoto && profilePhoto.length > 0) {
        adminData.profilePhoto = profilePhoto[0];
      }
    }
    const createAdmin = await transactionClient.admin.create({
      data: adminData,
    });
    return createUser;
  });
  return result;
};

const createMemberIntoDB = async (files: IFile[], payload: any) => {
  const { password, userData } = payload;

  const isexistUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (isexistUser && isexistUser) {
    throw new AppError(401, "This user already exist");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    const userInfo = {
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      role: UserRole.member,
    };
    const createUser = await transactionClient.user.create({ data: userInfo });

    const memberData = {
      ...userData,
      userId: createUser.id,
    };
    if (files) {
      const profilePhoto = await imageUploadToCloudinary(files);

      if (profilePhoto && profilePhoto.length > 0) {
        memberData.profilePhoto = profilePhoto[0];
      }
    }
    const createMember = await transactionClient.member.create({
      data: memberData,
    });
    return createUser;
  });
  return result;
};

const getUserByEmailFromDB = async (userData: {
  email: string;
  role: string;
}) => {
  const { email, role } = userData;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user?.role !== role) {
    throw new AppError(StatusCodes.UNAUTHORIZED, `You are not ${role}`);
  }
  // console.log(user);

  let result;

  if (user?.role === "member") {
    result = await prisma.member.findUnique({
      where: { email },
    });
  }

  if (user?.role === "admin") {
    await prisma.admin.findUnique({ where: { email } });
  }

  if (!result) {
    throw new AppError(404, "user not found");
  }

  return result;
};

export const userService = {
  createAdminIntoDB,
  createMemberIntoDB,
  getUserByEmailFromDB,
};
