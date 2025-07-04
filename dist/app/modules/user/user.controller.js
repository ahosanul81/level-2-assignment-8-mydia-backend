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
exports.userController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const createAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createAdminIntoDB(req.files, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Admin created successfully",
        data: result,
    });
}));
const createMember = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createMemberIntoDB(req.files, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Member created successfully",
        data: result,
    });
}));
const getMemberByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUserByEmailFromDB(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Member fetched successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUserFromDB(req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User fetched successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const updateUserStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserStatusIntoDB(req.params.userId, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User status updated successfully",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getMeFromDB(req.params.userEmail);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Get me fetched successfully",
        data: result,
    });
}));
exports.userController = {
    createAdmin,
    createMember,
    getMemberByEmail,
    getAllUser,
    updateUserStatus,
    getMe,
};
