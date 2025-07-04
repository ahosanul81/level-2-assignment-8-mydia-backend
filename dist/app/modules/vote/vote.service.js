"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteService = void 0;
const prisma_1 = require("../../utils/prisma");
const idea_utils_1 = require("../idea/idea.utils");
const upVoteIntoDB = (ideaId, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    let memberId;
    if (user.role === "member") {
        const roleBasedUser = yield prisma_1.prisma.member.findUnique({
            where: { email: user.email },
            select: {
                id: true,
            },
        });
        memberId = roleBasedUser === null || roleBasedUser === void 0 ? void 0 : roleBasedUser.id;
    }
    if (!memberId) {
        throw new Error("memberId not found for voting.");
    }
    const voteInfo = {
        memberId,
        ideaId,
        upVote: payload.upVote === true ? 1 : 0,
    };
    const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistUpVoteWithIdeaId = yield transactionClient.vote.findUnique({
            where: {
                memberId_ideaId: {
                    memberId,
                    ideaId,
                },
            },
        });
        if (isExistUpVoteWithIdeaId) {
            const result = yield transactionClient.vote.update({
                where: { memberId_ideaId: { memberId, ideaId } },
                data: voteInfo,
            });
        }
        else {
            const result = yield transactionClient.vote.create({ data: voteInfo });
        }
        const downVoteUpdate = yield transactionClient.vote.update({
            where: { memberId_ideaId: { memberId, ideaId } },
            data: { downVote: 0 },
        });
        // delete the row when both upvote and down vote are 0
        if (downVoteUpdate.upVote === 0 && downVoteUpdate.downVote === 0) {
            const deleteRowFromVoteTable = yield transactionClient.vote.delete({
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
        const totalUpVote = yield transactionClient.vote.count({
            where: { upVote: 1 },
        });
        return { totalUpVote };
    }));
    return result;
});
const downVoteIntoDB = (ideaId, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    let memberId;
    if (user.role === "member") {
        const roleBasedUser = yield prisma_1.prisma.member.findUnique({
            where: { email: user.email },
            select: {
                id: true,
            },
        });
        memberId = roleBasedUser === null || roleBasedUser === void 0 ? void 0 : roleBasedUser.id;
    }
    if (!memberId) {
        throw new Error("memberId not found for voting.");
    }
    const voteInfo = {
        memberId,
        ideaId,
        downVote: payload.downVote === true ? 1 : 0,
    };
    const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistdownVoteWithIdeaId = yield transactionClient.vote.findUnique({
            where: { memberId_ideaId: { memberId, ideaId } },
        });
        if (isExistdownVoteWithIdeaId) {
            const result = yield transactionClient.vote.update({
                where: { memberId_ideaId: { memberId, ideaId } },
                data: voteInfo,
            });
        }
        else {
            const result = yield transactionClient.vote.create({ data: voteInfo });
        }
        const upVoteUpdate = yield transactionClient.vote.update({
            where: { memberId_ideaId: { memberId, ideaId } },
            data: { upVote: 0 },
        });
        // delete the row when both upvote and down vote are 0
        if (upVoteUpdate.upVote === 0 && upVoteUpdate.downVote === 0) {
            const deleteRowFromVoteTable = yield transactionClient.vote.delete({
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
        const totaldownVote = yield transactionClient.vote.count({
            where: { downVote: 1 },
        });
        return { totaldownVote };
    }));
    return result;
});
const voteCountFromDB = (ideaId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const upVote = yield prisma_1.prisma.vote.groupBy({
        where: { ideaId },
        by: ["ideaId"],
        _sum: {
            upVote: true,
        },
    });
    const downVote = yield prisma_1.prisma.vote.groupBy({
        where: { ideaId },
        by: ["ideaId"],
        _sum: {
            downVote: true,
        },
    });
    const upVotes = ((_a = upVote[0]) === null || _a === void 0 ? void 0 : _a._sum.upVote) || 0;
    const downVotes = ((_b = downVote[0]) === null || _b === void 0 ? void 0 : _b._sum.downVote) || 0;
    const totalVote = upVotes - downVotes;
    // console.log(result);
    return totalVote;
});
exports.voteService = { upVoteIntoDB, downVoteIntoDB, voteCountFromDB };
