import { Prisma } from "@prisma/client";
import { TQueryFilters } from "../modules/idea/idea.interface";

export const queryBuilder = <
  T extends Prisma.UserWhereInput | Prisma.IdeaWhereInput
>(
  queryFilter: TQueryFilters,
  defaultFilter: Record<string, string | boolean>
): T[] => {
  let andCondtion = [];
  if (Object.values(queryFilter).some((value) => value !== undefined)) {
    const orCondition = Object.keys(queryFilter)?.map((key) => {
      const typedKey = key as keyof typeof queryFilter; //type issue solved by gpt
      const value = queryFilter[typedKey];
      if (key === "category") {
        return {
          category: {
            categoryName: {
              equals: value,
            },
          },
        };
      }
      if (key === "isPaid") {
        return {
          isPaid: {
            equals: value === "true" ? true : false,
          },
        };
      }
      if (key === "isDeleted") {
        return {
          isDeleted: {
            equals: value === "true" ? true : false,
          },
        };
      }
      return {
        [key]: {
          equals: value,
        },
      };
    });
    andCondtion.push({ AND: orCondition });
  } else {
    andCondtion.push(defaultFilter);
  }
  return andCondtion as T[];
};
