import { IdeaStatus } from "@prisma/client";

export type TIdea = {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  imageUrls?: string[];
  isPaid?: boolean; // Optional, defaults to false
  status?: IdeaStatus | undefined; // Optional, defaults to 'pending'
  feedbackOfRejection?: string; // Optional
  categoryId: string;
  memberId: string;
};

export type TQueryFilters = {
  searchTerm?: string;
  isPaid?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  isDeleted?: boolean;
  role?: string;
  page?: string;
  limit?: string;
};
