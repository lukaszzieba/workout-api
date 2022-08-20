import { Response } from 'express';
import AppError from './error';

export const handleError = (error: AppError, res: Response) => {
  const { statusCode, message, isOperational } = error;
  if (!isOperational) {
    console.error(error.stack);
    process.exit(1);
  }
  res.status(statusCode).json({ error: message });
};
