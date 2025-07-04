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
exports.isExistUser = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../utils/AppError");
const prisma = new client_1.PrismaClient();
const userValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { email: req.body.userData.email },
        });
        if ((user === null || user === void 0 ? void 0 : user.status) !== "active") {
            console.log(user === null || user === void 0 ? void 0 : user.status);
        }
        return user;
    }
    catch (error) {
        next(error);
    }
});
const isExistUser = (searchValue) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            OR: [{ id: searchValue }, { email: searchValue }],
        },
    });
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    return user;
});
exports.isExistUser = isExistUser;
