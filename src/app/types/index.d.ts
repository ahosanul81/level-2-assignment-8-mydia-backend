import { TJwtPayload } from "../interface/jwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; role: string };
    }
  }
}
