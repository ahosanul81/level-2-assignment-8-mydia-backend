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
exports.categoryController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const category_service_1 = require("./category.service");
const getAllCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getAllCategoryFromDB();
    res.status(200).json({
        statusCode: 200,
        message: "Category fetched successfully",
        data: result,
    });
}));
const createCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.createCategoryIntoDB(req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Category created successfully",
        data: result,
    });
}));
exports.categoryController = { getAllCategory, createCategory };
