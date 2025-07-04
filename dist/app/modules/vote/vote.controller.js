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
exports.voteController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const catchAsync_1 = require("../../utils/catchAsync");
const vote_service_1 = require("./vote.service");
const upVote = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user = token && (0, jsonwebtoken_1.decode)(token);
    const result = yield vote_service_1.voteService.upVoteIntoDB(req.params.ideaId, user, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Up vote  successfully",
        data: result,
    });
}));
const downVote = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user = token && (0, jsonwebtoken_1.decode)(token);
    const result = yield vote_service_1.voteService.downVoteIntoDB(req.params.ideaId, user, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Down vote  successfully",
        data: result,
    });
}));
const voteCount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vote_service_1.voteService.voteCountFromDB(req.params.ideaId);
    res.status(200).json({
        statusCode: 200,
        message: " vote count successfully",
        data: result,
    });
}));
exports.voteController = { upVote, downVote, voteCount };
