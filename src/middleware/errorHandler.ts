import { Request, Response, NextFunction } from 'express';
import { ConflictError, NotFoundError } from '../services/userService';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ status: 'error', message: err.message });
    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({ status: 'error', message: err.message });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
}
