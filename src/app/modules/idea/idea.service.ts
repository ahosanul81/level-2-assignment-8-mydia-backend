import { IdeaStatus, Prisma } from "@prisma/client";
import { IFile } from "../../interface/fileType";
import { AppError } from "../../utils/AppError";
import { imageUploadToCloudinary } from "../../utils/imageUploadToCloudinary";
import { prisma } from "../../utils/prisma";
import { TIdea, TQueryFilters } from "./idea.interface";
import { calculatePagination } from "../../utils/calculatePagination";
import { isExistIdea } from "./idea.utils";

const getAllIdeaFromDB = async (query: TQueryFilters) => {
  const { searchTerm, isPaid, status, category, sortBy, sortOrder } = query;
  const queryFilter = { isPaid, status, category };
  const options = { sortBy, sortOrder };
  const { page, limit, skip } = calculatePagination(options);

  const searchAbleFields = [
    "title",
    "problemStatement",
    "proposedSolution",
    "description",
    "status",
  ];

  let andCondtion: Prisma.IdeaWhereInput[] = [];

  if (searchTerm) {
    for (const field of searchAbleFields) {
      andCondtion.push({
        OR: [
          {
            [field]: {
              contains: searchTerm,
            },
          },
        ],
      });
    }
  }

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
      return {
        [key]: {
          equals: value,
        },
      };
    });
    andCondtion.push({ AND: orCondition });
  } else {
    andCondtion.push({
      status: "approved",
      isDeleted: false,
    });
  }

  const result = await prisma.idea.findMany({
    where: {
      AND: andCondtion,
    },
    skip,
    take: limit,
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
      member: {
        select: {
          name: true,
          email: true,
          contactNumber: true,
          address: true,
        },
      },
      comments: {
        include: {
          member: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePhoto: true,
            },
          },
          parent: {
            include: {
              member: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
      votes: true,
    },
  });

  const totalCount = await prisma.idea.count({
    where: {
      AND: andCondtion,
    },
  });
  // console.log(result);

  // const commentSForLimit = await prisma.comment

  return {
    meta: { page, limit, total: totalCount },
    result,
  };
};

const getIdeaByIdFromDB = async (ideaId: string) => {
  if (!ideaId && !ideaId) {
    throw new AppError(404, "No idea id provided");
  }
  const isExistIdea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!isExistIdea) {
    throw new AppError(404, "No idea found");
  }
  const result = await prisma.idea.findUnique({ where: { id: ideaId } });
  return result;
};
const addIdeaIntoDB = async (files: IFile[], payload: TIdea) => {
  //   console.log(files);
  const ideaInfo = {
    ...payload,
  };
  if (
    payload &&
    payload.memberId &&
    !(await prisma.member.findUnique({ where: { id: payload.memberId } }))
  ) {
    throw new AppError(404, "Your provided member not found");
  }
  if (
    payload &&
    payload.categoryId &&
    !(await prisma.category.findUnique({ where: { id: payload.categoryId } }))
  ) {
    throw new AppError(404, "Your provided category not found");
  }
  if (files && files.length > 0) {
    const imageUrls = await imageUploadToCloudinary(files);
    imageUrls && (ideaInfo.imageUrls = imageUrls);
  }

  const addIdea = await prisma.idea.create({ data: ideaInfo });

  return addIdea;
};

const updateIdeaIntoDB = async (
  ideaId: string,
  files: IFile[],
  payload: TIdea
) => {
  const ideaInfo = {
    ...payload,
  };
  if (!ideaId && !ideaId) {
    throw new AppError(404, "No idea id provided");
  }
  const idea = await isExistIdea(ideaId);
  if (
    payload &&
    payload.memberId &&
    !(await prisma.member.findUnique({ where: { id: payload.memberId } }))
  ) {
    throw new AppError(404, "Your provided member not found");
  }
  if (
    payload &&
    payload.categoryId &&
    !(await prisma.category.findUnique({ where: { id: payload.categoryId } }))
  ) {
    throw new AppError(404, "Your provided category not found");
  }

  if (files && files.length > 0) {
    const imageUrl = await imageUploadToCloudinary(files);
    imageUrl && (ideaInfo.imageUrls = imageUrl);
  }
  const result = await prisma.idea.update({
    where: { id: ideaId },
    data: ideaInfo,
  });
  return result;
};

const deleteIdeaFromDB = async (ideaId: string) => {
  const idea = await isExistIdea(ideaId);
  const result = await prisma.idea.update({
    where: { id: ideaId },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
const updateIdeaStatusIntoDB = async (
  ideaId: string,
  payload: { status: IdeaStatus; feedbackOfRejection?: string }
) => {
  const idea = await isExistIdea(ideaId);

  if (idea.status !== "pending") {
    throw new AppError(404, `This idea already ${idea.status}`);
  }
  const result = await prisma.idea.update({
    where: { id: ideaId },
    data: payload,
  });
  return result;
};
export const ideaService = {
  getAllIdeaFromDB,
  getIdeaByIdFromDB,
  addIdeaIntoDB,
  updateIdeaIntoDB,
  deleteIdeaFromDB,
  updateIdeaStatusIntoDB,
};
