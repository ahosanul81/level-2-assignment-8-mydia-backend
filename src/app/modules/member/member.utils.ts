// check the member is exist or not by email

import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";

export const isExistMemberByEmail = async (email: string) => {
  const isExistMember = await prisma.member.findUnique({ where: { email } });
  if (!isExistMember) {
    throw new AppError(404, "No member found");
  }
  return isExistMember;
};
