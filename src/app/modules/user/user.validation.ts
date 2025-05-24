import { z } from "zod";

const createAdmin = z.object({
  password: z.string(),
  userData: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    address: z.string(),
  }),
});
const createMember = z.object({
  password: z.string(),
  userData: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    address: z.string(),
  }),
});

export const userValidation = { createAdmin, createMember };
