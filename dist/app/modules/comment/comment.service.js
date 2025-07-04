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
exports.commentService = void 0;
const AppError_1 = require("../../utils/AppError");
const prisma_1 = require("../../utils/prisma");
const idea_utils_1 = require("../idea/idea.utils");
const addCommentIntoDB = (ideaId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    // console.log(idea);
    const result = yield prisma_1.prisma.comment.create({ data: payload });
    return result;
});
const addReplyIntoDB = (ideaId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId, text } = payload;
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    const isExistParentComment = yield prisma_1.prisma.comment.findUnique({
        where: { id: parentId },
    });
    if (!isExistParentComment) {
        throw new AppError_1.AppError(404, "Previous comment was deleted");
    }
    const result = yield prisma_1.prisma.comment.create({
        data: payload,
    });
    return result;
});
const deleteCommentIntoDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistParentComment = yield prisma_1.prisma.comment.findUnique({
        where: { id: commentId },
    });
    if (!isExistParentComment) {
        throw new AppError_1.AppError(404, " comment was deleted");
    }
    const result = yield prisma_1.prisma.comment.delete({ where: { id: commentId } });
    return result;
});
const updateCommentIntoDB = (commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { ideaId, memberId, parentId } = payload;
    if (commentId && memberId && ideaId) {
        const isExistComment = yield prisma_1.prisma.comment.findUnique({
            where: { id: commentId, memberId, ideaId },
        });
        if (!isExistComment) {
            throw new AppError_1.AppError(404, "Idea or comment was deleted");
        }
    }
    const result = yield prisma_1.prisma.comment.update({
        where: { id: commentId },
        data: payload,
    });
    return result;
});
const commentCountFromDB = (ideaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.comment.groupBy({
        by: ["ideaId"],
        _count: true,
    });
    return result;
});
exports.commentService = {
    addCommentIntoDB,
    addReplyIntoDB,
    deleteCommentIntoDB,
    updateCommentIntoDB,
    commentCountFromDB,
};
