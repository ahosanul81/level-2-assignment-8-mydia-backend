import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";

const getAllCategoryFromDB = async () => {
  const result = await prisma.category.findMany({
    select: {
      id: true,
      categoryName: true,
    },
  });
  if (!result) {
    throw new AppError(404, "No category found");
  }
  return result;
};
const createCategoryIntoDB = async (payload: any) => {
  const result = await prisma.category.create({ data: payload });
  return result;
};

export const categoryService = { getAllCategoryFromDB, createCategoryIntoDB };
