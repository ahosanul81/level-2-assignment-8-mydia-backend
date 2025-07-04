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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const AppError_1 = require("../../utils/AppError");
const imageUploadToCloudinary_1 = require("../../utils/imageUploadToCloudinary");
const http_status_codes_1 = require("http-status-codes");
const calculatePagination_1 = require("../../utils/calculatePagination");
const queryBuilder_1 = require("../../utils/queryBuilder");
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createAdminIntoDB = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, userData } = payload;
    const isexistUser = yield prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (isexistUser && isexistUser) {
        throw new AppError_1.AppError(401, "This user already exist");
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const hashPassword = bcrypt_1.default.hashSync(password, 10);
        const userInfo = {
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            role: client_1.UserRole.admin,
        };
        const createUser = yield transactionClient.user.create({ data: userInfo });
        const adminData = Object.assign(Object.assign({}, userData), { userId: createUser.id });
        if (files) {
            const profilePhoto = yield (0, imageUploadToCloudinary_1.imageUploadToCloudinary)(files);
            if (profilePhoto && profilePhoto.length > 0) {
                adminData.profilePhoto = profilePhoto[0];
            }
        }
        const createAdmin = yield transactionClient.admin.create({
            data: adminData,
        });
        return createUser;
    }));
    return result;
});
const createMemberIntoDB = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, userData } = payload;
    const isexistUser = yield prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (isexistUser && isexistUser) {
        throw new AppError_1.AppError(401, "This user already exist");
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const hashPassword = bcrypt_1.default.hashSync(password, 10);
        const userInfo = {
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            role: client_1.UserRole.member,
        };
        const createUser = yield transactionClient.user.create({ data: userInfo });
        const memberData = Object.assign(Object.assign({}, userData), { userId: createUser.id });
        if (files) {
            const profilePhoto = yield (0, imageUploadToCloudinary_1.imageUploadToCloudinary)(files);
            if (profilePhoto && profilePhoto.length > 0) {
                memberData.profilePhoto = profilePhoto[0];
            }
        }
        const createMember = yield transactionClient.member.create({
            data: memberData,
        });
        return createUser;
    }));
    if (result.email && result.role) {
        const jwtData = {
            email: result.email,
            role: result.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(jwtData, config_1.default.jwt.access_token_secret, {
            expiresIn: "15d",
        });
        const refreshToken = jsonwebtoken_1.default.sign(jwtData, config_1.default.jwt.refresh_token_secret, {
            expiresIn: "60d",
        });
        return { accessToken, refreshToken };
    }
});
const getUserByEmailFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = userData;
    // const result = await prisma.user.findUnique({
    //   where: { email },
    //   include: { Member: true, Admin: true },
    // });
    const user = yield prisma.user.findUnique({ where: { email } });
    if ((user === null || user === void 0 ? void 0 : user.role) !== role) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `You are not ${role}`);
    }
    let result;
    if ((user === null || user === void 0 ? void 0 : user.role) === "member") {
        result = yield prisma.member.findUnique({
            where: { email },
        });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
        result = yield prisma.admin.findUnique({ where: { email } });
    }
    if (!result) {
        throw new AppError_1.AppError(404, "user not found");
    }
    return result;
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const { role, status, sortBy, sortOrder, page, limit } = query;
    const queryFilter = { role, status };
    const options = { page, limit, sortBy, sortOrder };
    const pagination = (0, calculatePagination_1.calculatePagination)(options);
    const andCondition = (0, queryBuilder_1.queryBuilder)(queryFilter, {});
    // console.dir(andCondition, { depth: null });
    const result = yield prisma.user.findMany({
        where: {
            AND: andCondition,
        },
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : undefined,
    });
    const totalCount = yield prisma.user.count({
        where: {
            AND: andCondition,
        },
    });
    return {
        meta: { page, limit, total: totalCount },
        result,
    };
});
const updateUserStatusIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = (0, user_utils_1.isExistUser)(userId);
    const result = yield prisma.user.update({
        where: { id: userId },
        data: { status: payload.status },
    });
    if (result.status !== payload.status) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "User status not updated");
    }
    return result;
});
const getMeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                },
            },
            Admin: {
                select: {
                    id: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                },
            },
        },
    });
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    let formatedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
    if ((_a = user.Admin) === null || _a === void 0 ? void 0 : _a.id) {
        formatedUser.adminId = user.Admin.id;
        formatedUser.profilePhoto = user.Admin.profilePhoto;
        formatedUser.contactNumber = user.Admin.contactNumber;
        formatedUser.address = user.Admin.address;
    }
    if ((_b = user.Member) === null || _b === void 0 ? void 0 : _b.id) {
        formatedUser.memberId = user.Member.id;
        formatedUser.profilePhoto = user.Member.profilePhoto;
        formatedUser.contactNumber = user.Member.contactNumber;
        formatedUser.address = user.Member.address;
    }
    return formatedUser;
});
exports.userService = {
    createAdminIntoDB,
    createMemberIntoDB,
    getUserByEmailFromDB,
    getAllUserFromDB,
    updateUserStatusIntoDB,
    getMeFromDB,
};
