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
exports.ideaService = void 0;
const AppError_1 = require("../../utils/AppError");
const imageUploadToCloudinary_1 = require("../../utils/imageUploadToCloudinary");
const prisma_1 = require("../../utils/prisma");
const calculatePagination_1 = require("../../utils/calculatePagination");
const idea_utils_1 = require("./idea.utils");
const member_utils_1 = require("../member/member.utils");
const queryBuilder_1 = require("../../utils/queryBuilder");
const getAllIdeaFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, isPaid, status, category, sortBy, sortOrder, isDeleted, page, limit, } = query;
    const queryFilter = { isPaid, status, category, isDeleted };
    const options = { sortBy, sortOrder, page, limit };
    const pagination = (0, calculatePagination_1.calculatePagination)(options);
    const searchAbleFields = [
        "title",
        "problemStatement",
        "proposedSolution",
        "description",
    ];
    let andCondtion = [];
    if (searchTerm) {
        console.log(searchTerm);
        for (const field of searchAbleFields) {
            andCondtion.push({
                OR: [
                    {
                        [field]: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                ],
            });
        }
    }
    console.log(andCondtion);
    if (!searchTerm) {
        andCondtion = (0, queryBuilder_1.queryBuilder)(queryFilter, {
            status: "approved",
            isDeleted: false,
        });
    }
    // if (Object.values(queryFilter).some((value) => value !== undefined)) {
    //   const orCondition = Object.keys(queryFilter)?.map((key) => {
    //     const typedKey = key as keyof typeof queryFilter; //type issue solved by gpt
    //     const value = queryFilter[typedKey];
    //     if (key === "category") {
    //       return {
    //         category: {
    //           categoryName: {
    //             equals: value,
    //           },
    //         },
    //       };
    //     }
    //     if (key === "isPaid") {
    //       return {
    //         isPaid: {
    //           equals: value === "true" ? true : false,
    //         },
    //       };
    //     }
    //     if (key === "isDeleted") {
    //       return {
    //         isDeleted: {
    //           equals: value === "true" ? true : false,
    //         },
    //       };
    //     }
    //     return {
    //       [key]: {
    //         equals: value,
    //       },
    //     };
    //   });
    //   andCondtion.push({ AND: orCondition });
    // } else {
    //   andCondtion.push({
    //     status: "approved",
    //     isDeleted: false,
    //   });
    // }
    const result = yield prisma_1.prisma.idea.findMany({
        where: {
            AND: andCondtion, // AND: andCondtion
        },
        skip: pagination.skip,
        take: pagination.limit,
        include: {
            category: {
                select: {
                    id: true,
                    categoryName: true,
                },
            },
            member: {
                select: {
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                },
            },
            comments: {
                include: {
                    member: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            profilePhoto: true,
                        },
                    },
                    parent: {
                        include: {
                            member: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            },
            votes: true,
        },
    });
    const totalCount = yield prisma_1.prisma.idea.count({
        where: {
            AND: andCondtion,
        },
    });
    return {
        meta: { page, limit, total: totalCount },
        result,
    };
});
const getIdeaByIdFromDB = (ideaId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ideaId && !ideaId) {
        throw new AppError_1.AppError(404, "No idea id provided");
    }
    const isExistIdea = yield prisma_1.prisma.idea.findUnique({ where: { id: ideaId } });
    if (!isExistIdea) {
        throw new AppError_1.AppError(404, "No idea found");
    }
    const result = yield prisma_1.prisma.idea.findUnique({ where: { id: ideaId } });
    return result;
});
const addIdeaIntoDB = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(files);
    const ideaInfo = Object.assign({}, payload);
    if (payload &&
        payload.memberId &&
        !(yield prisma_1.prisma.member.findUnique({ where: { id: payload.memberId } }))) {
        throw new AppError_1.AppError(404, "Your provided member not found");
    }
    if (payload &&
        payload.categoryId &&
        !(yield prisma_1.prisma.category.findUnique({ where: { id: payload.categoryId } }))) {
        throw new AppError_1.AppError(404, "Your provided category not found");
    }
    if (files && files.length > 0) {
        const imageUrls = yield (0, imageUploadToCloudinary_1.imageUploadToCloudinary)(files);
        imageUrls && (ideaInfo.imageUrls = imageUrls);
    }
    const addIdea = yield prisma_1.prisma.idea.create({ data: ideaInfo });
    return addIdea;
});
const updateIdeaIntoDB = (ideaId, files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ideaInfo = Object.assign({}, payload);
    if (!ideaId && !ideaId) {
        throw new AppError_1.AppError(404, "No idea id provided");
    }
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    if (payload &&
        payload.memberId &&
        !(yield prisma_1.prisma.member.findUnique({ where: { id: payload.memberId } }))) {
        throw new AppError_1.AppError(404, "Your provided member not found");
    }
    if (payload &&
        payload.categoryId &&
        !(yield prisma_1.prisma.category.findUnique({ where: { id: payload.categoryId } }))) {
        throw new AppError_1.AppError(404, "Your provided category not found");
    }
    if (files && files.length > 0) {
        const imageUrl = yield (0, imageUploadToCloudinary_1.imageUploadToCloudinary)(files);
        imageUrl && (ideaInfo.imageUrls = imageUrl);
    }
    const result = yield prisma_1.prisma.idea.update({
        where: { id: ideaId },
        data: ideaInfo,
    });
    return result;
});
const deleteIdeaFromDB = (ideaId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ideaId);
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    const result = yield prisma_1.prisma.idea.update({
        where: { id: ideaId },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
const updateIdeaStatusIntoDB = (ideaId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    if (idea.status !== "pending") {
        throw new AppError_1.AppError(404, `This idea already ${idea.status}`);
    }
    const result = yield prisma_1.prisma.idea.update({
        where: { id: ideaId },
        data: payload,
    });
    return result;
});
const getMyIdeaFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield (0, member_utils_1.isExistMemberByEmail)(email);
    const result = yield prisma_1.prisma.idea.findMany({
        where: { memberId: member.id, isDeleted: false },
        include: {
            category: {
                select: {
                    id: true,
                    categoryName: true,
                },
            },
            member: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profilePhoto: true,
                },
            },
        },
    });
    return result;
});
const getAllStatusIdeaFromDB = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.idea.findMany({
        where: { status: status || "pending", isDeleted: false },
        include: {
            member: {
                select: {
                    name: true,
                    profilePhoto: true,
                },
            },
            category: {
                select: {
                    id: true,
                    categoryName: true,
                },
            },
        },
    });
    if (!result) {
        throw new AppError_1.AppError(404, "No idea found");
    }
    return result;
});
exports.ideaService = {
    getAllIdeaFromDB,
    getIdeaByIdFromDB,
    addIdeaIntoDB,
    updateIdeaIntoDB,
    deleteIdeaFromDB,
    updateIdeaStatusIntoDB,
    getMyIdeaFromDB,
    getAllStatusIdeaFromDB,
};
