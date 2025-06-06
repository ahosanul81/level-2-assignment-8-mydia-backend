import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";
import { isExistIdea } from "../idea/idea.utils";
import { TComment } from "./comment.interface";

const addCommentIntoDB = async (ideaId: string, payload: TComment) => {
  const idea = await isExistIdea(ideaId);
  // console.log(idea);
  const result = await prisma.comment.create({ data: payload });
  return result;
};

const addReplyIntoDB = async (ideaId: string, payload: TComment) => {
  const { parentId, text } = payload;
  const idea = await isExistIdea(ideaId);

  const isExistParentComment = await prisma.comment.findUnique({
    where: { id: parentId },
  });
  if (!isExistParentComment) {
    throw new AppError(404, "Previous comment was deleted");
  }
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

const deleteCommentIntoDB = async (commentId: string) => {
  const isExistParentComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!isExistParentComment) {
    throw new AppError(404, " comment was deleted");
  }

  const result = await prisma.comment.delete({ where: { id: commentId } });
  return result;
};

const updateCommentIntoDB = async (commentId: string, payload: TComment) => {
  const { ideaId, memberId, parentId } = payload;

  if (commentId && memberId && ideaId) {
    const isExistComment = await prisma.comment.findUnique({
      where: { id: commentId, memberId, ideaId },
    });

    if (!isExistComment) {
      throw new AppError(404, "Idea or comment was deleted");
    }
  }

  const result = await prisma.comment.update({
    where: { id: commentId },
    data: payload,
  });
  return result;
};
const commentCountFromDB = async (ideaId: string) => {
  const result = await prisma.comment.groupBy({
    by: ["ideaId"],
    _count: true,
  });
  return result;
};

export const commentService = {
  addCommentIntoDB,
  addReplyIntoDB,
  deleteCommentIntoDB,
  updateCommentIntoDB,
  commentCountFromDB,
};
