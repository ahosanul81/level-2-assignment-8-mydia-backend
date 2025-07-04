"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandle = void 0;
const AppError_1 = require("../utils/AppError");
const zod_1 = require("zod");
const globalErrorHandle = (error, req, res, next) => {
    var _a;
    console.log(error);
    let statusCode = 500;
    let message = "something went wrong";
    let errorSources = [{ path: "", message: "" }];
    if (error instanceof zod_1.ZodError) {
        message = "zodError";
        statusCode = 400;
        errorSources = (_a = error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => ({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }));
    }
    if (error instanceof AppError_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSources,
    });
};
exports.globalErrorHandle = globalErrorHandle;
