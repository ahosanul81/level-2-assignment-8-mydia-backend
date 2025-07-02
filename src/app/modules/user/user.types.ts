import { UserRole, UserStatus } from "@prisma/client";

export interface IAdmin {
  userId: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  address?: string;
  isDeleted?: string;
}

export interface IMember {
  userId: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  address?: string;
  isVerified?: string;
  isDeleted?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  adminId?: string;
  memberId?: string;
  profilePhoto?: string | null;
  contactNumber?: string;
  address?: string | null;
}
