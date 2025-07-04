"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const zod_1 = require("zod");
const addComment = zod_1.z.object({
    ideaId: zod_1.z.string(),
    memberId: zod_1.z.string(),
    text: zod_1.z.string(),
});
const addReply = zod_1.z.object({
    ideaId: zod_1.z.string(),
    memberId: zod_1.z.string(),
    parentId: zod_1.z.string(),
    text: zod_1.z.string(),
});
const updateComment = zod_1.z.object({
    ideaId: zod_1.z.string().optional(),
    memberId: zod_1.z.string().optional(),
    parentId: zod_1.z.string().nullable().optional(),
    text: zod_1.z.string().optional(),
});
exports.commentValidation = { addComment, addReply, updateComment };
