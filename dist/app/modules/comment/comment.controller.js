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
exports.commentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const comment_service_1 = require("./comment.service");
const addComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.addCommentIntoDB(req.params.ideaId, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "comment added successfully",
        data: result,
    });
}));
const addReply = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.addReplyIntoDB(req.params.ideaId, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Reply added successfully",
        data: result,
    });
}));
const deleteComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.deleteCommentIntoDB(req.params.commentId);
    res.status(200).json({
        statusCode: 200,
        message: "Comment deleted successfully",
        data: result,
    });
}));
const updateComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.updateCommentIntoDB(req.params.commentId, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Comment updated successfully",
        data: result,
    });
}));
const commentCount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.commentCountFromDB(req.params.ideaId);
    res.status(200).json({
        statusCode: 200,
        message: "Comment updated successfully",
        data: result,
    });
}));
exports.commentController = {
    addComment,
    addReply,
    deleteComment,
    updateComment,
    commentCount,
};
