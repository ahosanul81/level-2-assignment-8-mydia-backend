import { IdeaStatus } from "@prisma/client";
import { z } from "zod";

const add = z.object({
  title: z.string(),
  problemStatement: z.string(),
  proposedSolution: z.string(),
  description: z.string(),
  isPaid: z.boolean().optional(),
  categoryId: z.string(),
  memberId: z.string(),
});
const update = z.object({
  title: z.string().optional(),
  problemStatement: z.string().optional(),
  proposedSolution: z.string().optional(),
  description: z.string().optional(),
  isPaid: z.boolean().optional(),
  categoryId: z.string().optional(),
  memberId: z.string().optional(),
});
const updateIdeaStatus = z.object({
  status: z.enum([
    IdeaStatus.pending,
    IdeaStatus.approved,
    IdeaStatus.rejected,
  ]),
});

export const ideaValidation = { add, update, updateIdeaStatus };
