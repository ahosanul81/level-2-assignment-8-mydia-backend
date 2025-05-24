import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";
import { isExistIdea } from "../idea/idea.utils";
import { TVote } from "./vote.interface";

const upVoteIntoDB = async (ideaId: string, payload: TVote) => {
  const { memberId, upVote } = payload;
  const voteInfo = {
    memberId,
    ideaId,
    upVote: upVote === true ? 1 : 0,
  };
  const idea = await isExistIdea(ideaId);
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistUpVoteWithIdeaId = await transactionClient.vote.findUnique({
      where: { ideaId },
    });
    if (isExistUpVoteWithIdeaId) {
      const result = await transactionClient.vote.update({
        where: { ideaId },
        data: voteInfo,
      });
    } else {
      const result = await transactionClient.vote.create({ data: voteInfo });
    }
    const downVoteUpdate = await transactionClient.vote.update({
      where: { ideaId },
      data: { downVote: 0 },
    });
    // delete the row when both upvote and down vote are 0
    if (downVoteUpdate.upVote === 0 && downVoteUpdate.downVote === 0) {
      const deleteRowFromVoteTable = await transactionClient.vote.delete({
        where: {
          ideaId,
          AND: [
            {
              upVote: 0,
            },
            {
              downVote: 0,
            },
          ],
        },
      });
    }
    const totalUpVote = await transactionClient.vote.count({
      where: { upVote: 1 },
    });
    return { totalUpVote };
  });
  return result;
};
const downVoteIntoDB = async (ideaId: string, payload: TVote) => {
  const { memberId, downVote } = payload;
  const voteInfo = {
    memberId,
    ideaId,
    downVote: downVote === true ? 1 : 0,
  };
  const idea = await isExistIdea(ideaId);
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistdownVoteWithIdeaId = await transactionClient.vote.findUnique({
      where: { ideaId },
    });
    if (isExistdownVoteWithIdeaId) {
      const result = await transactionClient.vote.update({
        where: { ideaId },
        data: voteInfo,
      });
    } else {
      const result = await transactionClient.vote.create({ data: voteInfo });
    }
    const upVoteUpdate = await transactionClient.vote.update({
      where: { ideaId },
      data: { upVote: 0 },
    });
    // delete the row when both upvote and down vote are 0
    if (upVoteUpdate.upVote === 0 && upVoteUpdate.downVote === 0) {
      const deleteRowFromVoteTable = await transactionClient.vote.delete({
        where: {
          ideaId,
          AND: [
            {
              upVote: 0,
            },
            {
              downVote: 0,
            },
          ],
        },
      });
    }
    const totaldownVote = await transactionClient.vote.count({
      where: { downVote: 1 },
    });

    return { totaldownVote };
  });
  return result;
};

export const voteService = { upVoteIntoDB, downVoteIntoDB };
