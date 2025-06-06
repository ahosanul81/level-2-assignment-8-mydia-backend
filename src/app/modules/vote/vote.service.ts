import { TJwtPayload } from "../../interface/jwtPayload";
import { prisma } from "../../utils/prisma";
import { isExistIdea } from "../idea/idea.utils";
import { TVote } from "./vote.interface";

const upVoteIntoDB = async (
  ideaId: string,
  user: TJwtPayload,
  payload: TVote
) => {
  const idea = await isExistIdea(ideaId);
  let memberId: string | undefined;

  if (user.role === "member") {
    const roleBasedUser = await prisma.member.findUnique({
      where: { email: user.email },
      select: {
        id: true,
      },
    });
    memberId = roleBasedUser?.id;
  }

  if (!memberId) {
    throw new Error("memberId not found for voting.");
  }

  const voteInfo = {
    memberId,
    ideaId,
    upVote: payload.upVote === true ? 1 : 0,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistUpVoteWithIdeaId = await transactionClient.vote.findUnique({
      where: {
        memberId_ideaId: {
          memberId,
          ideaId,
        },
      },
    });
    if (isExistUpVoteWithIdeaId) {
      const result = await transactionClient.vote.update({
        where: { memberId_ideaId: { memberId, ideaId } },
        data: voteInfo,
      });
    } else {
      const result = await transactionClient.vote.create({ data: voteInfo });
    }
    const downVoteUpdate = await transactionClient.vote.update({
      where: { memberId_ideaId: { memberId, ideaId } },
      data: { downVote: 0 },
    });
    // delete the row when both upvote and down vote are 0
    if (downVoteUpdate.upVote === 0 && downVoteUpdate.downVote === 0) {
      const deleteRowFromVoteTable = await transactionClient.vote.delete({
        where: {
          memberId_ideaId: { memberId, ideaId },
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
const downVoteIntoDB = async (
  ideaId: string,
  user: TJwtPayload,
  payload: TVote
) => {
  const idea = await isExistIdea(ideaId);
  let memberId: string | undefined;

  if (user.role === "member") {
    const roleBasedUser = await prisma.member.findUnique({
      where: { email: user.email },
      select: {
        id: true,
      },
    });
    memberId = roleBasedUser?.id;
  }

  if (!memberId) {
    throw new Error("memberId not found for voting.");
  }

  const voteInfo = {
    memberId,
    ideaId,
    downVote: payload.downVote === true ? 1 : 0,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistdownVoteWithIdeaId = await transactionClient.vote.findUnique({
      where: { memberId_ideaId: { memberId, ideaId } },
    });
    if (isExistdownVoteWithIdeaId) {
      const result = await transactionClient.vote.update({
        where: { memberId_ideaId: { memberId, ideaId } },
        data: voteInfo,
      });
    } else {
      const result = await transactionClient.vote.create({ data: voteInfo });
    }
    const upVoteUpdate = await transactionClient.vote.update({
      where: { memberId_ideaId: { memberId, ideaId } },
      data: { upVote: 0 },
    });
    // delete the row when both upvote and down vote are 0
    if (upVoteUpdate.upVote === 0 && upVoteUpdate.downVote === 0) {
      const deleteRowFromVoteTable = await transactionClient.vote.delete({
        where: {
          memberId_ideaId: { memberId, ideaId },
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

const voteCountFromDB = async (ideaId: string) => {
  const upVote = await prisma.vote.groupBy({
    where: { ideaId },
    by: ["ideaId"],
    _sum: {
      upVote: true,
    },
  });
  const downVote = await prisma.vote.groupBy({
    where: { ideaId },
    by: ["ideaId"],
    _sum: {
      downVote: true,
    },
  });
  const upVotes = upVote[0]?._sum.upVote || 0;
  const downVotes = downVote[0]?._sum.downVote || 0;

  const totalVote = upVotes - downVotes;

  // console.log(result);

  return totalVote;
};

export const voteService = { upVoteIntoDB, downVoteIntoDB, voteCountFromDB };
