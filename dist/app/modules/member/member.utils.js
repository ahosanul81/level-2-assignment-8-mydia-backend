"use strict";
// check the member is exist or not by email
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
exports.isExistMemberByEmail = void 0;
const AppError_1 = require("../../utils/AppError");
const prisma_1 = require("../../utils/prisma");
const isExistMemberByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistMember = yield prisma_1.prisma.member.findUnique({ where: { email } });
    if (!isExistMember) {
        throw new AppError_1.AppError(404, "No member found");
    }
    return isExistMember;
});
exports.isExistMemberByEmail = isExistMemberByEmail;
