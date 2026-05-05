import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Change to 'number' if your ID is an integer
    }
  }
}
