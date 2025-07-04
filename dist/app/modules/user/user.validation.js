"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string(),
    userData: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contactNumber: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
const createMember = zod_1.z.object({
    password: zod_1.z.string(),
    userData: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contactNumber: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
exports.userValidation = { createAdmin, createMember };
