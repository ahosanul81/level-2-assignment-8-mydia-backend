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
