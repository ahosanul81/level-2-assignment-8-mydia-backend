"use strict";
// check the idea is exist or not by id
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
exports.isExistIdea = void 0;
const AppError_1 = require("../../utils/AppError");
const prisma_1 = require("../../utils/prisma");
const isExistIdea = (ideaId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistIdea = yield prisma_1.prisma.idea.findUnique({ where: { id: ideaId } });
    if (!isExistIdea) {
        throw new AppError_1.AppError(404, "No idea found");
    }
    return isExistIdea;
});
exports.isExistIdea = isExistIdea;
