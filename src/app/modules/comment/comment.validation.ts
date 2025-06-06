import { z } from "zod";

const addComment = z.object({
  ideaId: z.string(),
  memberId: z.string(),
  text: z.string(),
});
const addReply = z.object({
  ideaId: z.string(),
  memberId: z.string(),
  parentId: z.string(),
  text: z.string(),
});
const updateComment = z.object({
  ideaId: z.string().optional(),
  memberId: z.string().optional(),
  parentId: z.string().nullable().optional(),
  text: z.string().optional(),
});

export const commentValidation = { addComment, addReply, updateComment };
