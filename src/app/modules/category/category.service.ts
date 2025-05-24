import { prisma } from "../../utils/prisma";

const createCategoryIntoDB = async (payload: any) => {
  const result = await prisma.category.create({ data: payload });
  return result;
};

export const categoryService = { createCategoryIntoDB };
