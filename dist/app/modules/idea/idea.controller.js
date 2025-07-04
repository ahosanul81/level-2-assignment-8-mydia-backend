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
exports.ideaController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const idea_service_1 = require("./idea.service");
const getAllIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.getAllIdeaFromDB(req.query);
    res.status(200).json({
        statusCode: 200,
        message: "fetched all idea successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getIdeaById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.getIdeaByIdFromDB(req.params.ideaId);
    res.status(200).json({
        statusCode: 200,
        message: "fetched  idea by id successfully",
        data: result,
    });
}));
const addIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const result = yield idea_service_1.ideaService.addIdeaIntoDB(files, req.body);
    res.status(200).json({
        statusCode: 200,
        message: "Idea added successfully",
        data: result,
    });
}));
const updateIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const result = yield idea_service_1.ideaService.updateIdeaIntoDB(req.params.ideaId, files, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Idea updated successfully",
        data: result,
    });
}));
const deleteIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.deleteIdeaFromDB(req.params.ideaId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Idea deleted successfully",
        data: result,
    });
}));
const updateIdeaStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.updateIdeaStatusIntoDB(req.params.ideaId, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Update idea status successfully",
        data: result,
    });
}));
const getMyIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.getMyIdeaFromDB(req.params.email);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "My idea fetched successfully",
        data: result,
    });
}));
const getAllStatusIdea = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield idea_service_1.ideaService.getAllStatusIdeaFromDB(req.params.status);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "idea fetched successfully",
        data: result,
    });
}));
exports.ideaController = {
    getAllIdea,
    getIdeaById,
    addIdea,
    updateIdea,
    deleteIdea,
    updateIdeaStatus,
    getMyIdea,
    getAllStatusIdea,
};
