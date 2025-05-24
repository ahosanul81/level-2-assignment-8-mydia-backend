-- AlterTable
ALTER TABLE "members" ALTER COLUMN "profilePhoto" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false,
ALTER COLUMN "isDeleted" SET DEFAULT false;
