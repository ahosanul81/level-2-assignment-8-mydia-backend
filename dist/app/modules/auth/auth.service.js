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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSerivice = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const prisma = new client_1.PrismaClient();
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(payload);
    const { email, password } = payload;
    const user = yield prisma.user.findUniqueOrThrow({
        where: { email },
    });
    if (!user) {
        throw new AppError_1.AppError(404, "This user not found");
    }
    if (user && !bcrypt_1.default.compareSync(password, user.password)) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.MISDIRECTED_REQUEST, "Password does not match");
    }
    if (user && user.status !== "active") {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `This user ${user.status}`);
    }
    const jwtData = {
        email: payload.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtData, config_1.default.jwt.access_token_secret, {
        expiresIn: "15d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtData, config_1.default.jwt.refresh_token_secret, {
        expiresIn: "60d",
    });
    return { accessToken, refreshToken };
});
exports.authSerivice = { loginIntoDB };
