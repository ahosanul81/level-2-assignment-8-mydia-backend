import bcrypt from "bcrypt";
import { Prisma, PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { IFile } from "../../interface/fileType";
import { imageUploadToCloudinary } from "../../utils/imageUploadToCloudinary";
import { StatusCodes } from "http-status-codes";
import { IMember } from "./user.types";
import { calculatePagination } from "../../utils/calculatePagination";
import { TQueryFilters } from "../idea/idea.interface";
import { queryBuilder } from "../../utils/queryBuilder";
import { isExistUser } from "./user.utils";
import config from "../../../config";
import jwt, { Secret } from "jsonwebtoken";
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
  if (result.email && result.role) {
    const jwtData = {
      email: result.email,
      role: result.role,
    };

    const accessToken = jwt.sign(
      jwtData,
      config.jwt.access_token_secret as Secret,
      {
        expiresIn: "15d",
      }
    );
    const refreshToken = jwt.sign(
      jwtData,
      config.jwt.refresh_token_secret as Secret,
      {
        expiresIn: "60d",
      }
    );

    return { accessToken, refreshToken };
  }
};

const getUserByEmailFromDB = async (userData: {
  email: string;
  role: string;
}) => {
  const { email, role } = userData;
  // const result = await prisma.user.findUnique({
  //   where: { email },
  //   include: { Member: true, Admin: true },
  // });
  const user = await prisma.user.findUnique({ where: { email } });
  if (user?.role !== role) {
    throw new AppError(StatusCodes.UNAUTHORIZED, `You are not ${role}`);
  }

  let result;

  if (user?.role === "member") {
    result = await prisma.member.findUnique({
      where: { email },
    });
  }

  if (user?.role === "admin") {
    result = await prisma.admin.findUnique({ where: { email } });
  }

  if (!result) {
    throw new AppError(404, "user not found");
  }

  return result;
};
const getAllUserFromDB = async (query: TQueryFilters) => {
  console.log(query);

  const { role, status, sortBy, sortOrder, page, limit } = query;
  const queryFilter = { role, status };
  const options = { page, limit, sortBy, sortOrder };
  const pagination = calculatePagination(options);

  const andCondition: Prisma.UserWhereInput[] = queryBuilder(queryFilter, {});
  // console.dir(andCondition, { depth: null });

  const result = await prisma.user.findMany({
    where: {
      AND: andCondition,
    },
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : undefined,
  });
  const totalCount = await prisma.user.count({
    where: {
      AND: andCondition,
    },
  });

  return {
    meta: { page, limit, total: totalCount },
    result,
  };
};

const updateUserStatusIntoDB = async (
  userId: string,
  payload: { status: UserStatus }
) => {
  console.log(payload);

  const user = isExistUser(userId);
  const result = await prisma.user.update({
    where: { id: userId },
    data: { status: payload.status },
  });
  if (result.status !== payload.status) {
    throw new AppError(StatusCodes.CONFLICT, "User status not updated");
  }
  return result;
};

const getMeFromDB = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      Member: {
        select: {
          id: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
        },
      },
      Admin: {
        select: {
          id: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
        },
      },
    },
  });
  if (!result) {
    throw new AppError(404, "User not found");
  }
  return result;
};
// Member: {
//         select: {
//           id: true,
//           name: true,
//           profilePhoto: true,
//           contactNumber: true,
//           address: true,
//         },
//       },
export const userService = {
  createAdminIntoDB,
  createMemberIntoDB,
  getUserByEmailFromDB,
  getAllUserFromDB,
  updateUserStatusIntoDB,
  getMeFromDB,
};
