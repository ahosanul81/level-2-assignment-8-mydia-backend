// check the idea is exist or not by id

import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";

export const isExistIdea = async (ideaId: string) => {
  const isExistIdea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!isExistIdea) {
    throw new AppError(404, "No idea found");
  }
  return isExistIdea;
};
