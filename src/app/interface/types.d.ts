import "express";

declare module "express-serve-static-core" {
  interface Request {
    files?: Express.Multer.File[];
  }
}
