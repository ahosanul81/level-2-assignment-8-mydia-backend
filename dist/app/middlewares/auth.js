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
exports.auth = void 0;
const AppError_1 = require("../utils/AppError");
const jwt_decode_1 = require("jwt-decode");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../utils/prisma");
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(404, "Token not found");
        }
        // const decoded = jwt.verify(token, config.jwt.access_token_secret as string);
        const decoded = (0, jwt_decode_1.jwtDecode)(token);
        const { email, role, iat, exp } = decoded;
        const userData = yield prisma_1.prisma.user.findUnique({
            where: { email },
            select: { role: true, email: true, status: true },
        });
        if (!roles.includes(userData.role)) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized user");
        }
        if ((userData === null || userData === void 0 ? void 0 : userData.status) !== "active") {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, `You are unauthorized. You are ${userData === null || userData === void 0 ? void 0 : userData.status}`);
        }
        if (new Date().getTime() > exp * 1000) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Login session is expired");
        }
        req.user = { email, role };
        next();
    });
};
exports.auth = auth;
