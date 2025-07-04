"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const add = zod_1.z.object({
    title: zod_1.z.string(),
    problemStatement: zod_1.z.string(),
    proposedSolution: zod_1.z.string(),
    description: zod_1.z.string(),
    isPaid: zod_1.z.boolean().optional(),
    categoryId: zod_1.z.string(),
    memberId: zod_1.z.string(),
});
const update = zod_1.z.object({
    title: zod_1.z.string().optional(),
    problemStatement: zod_1.z.string().optional(),
    proposedSolution: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    isPaid: zod_1.z.boolean().optional(),
    categoryId: zod_1.z.string().optional(),
    memberId: zod_1.z.string().optional(),
});
const updateIdeaStatus = zod_1.z.object({
    status: zod_1.z.enum([
        client_1.IdeaStatus.pending,
        client_1.IdeaStatus.approved,
        client_1.IdeaStatus.rejected,
    ]),
});
exports.ideaValidation = { add, update, updateIdeaStatus };
