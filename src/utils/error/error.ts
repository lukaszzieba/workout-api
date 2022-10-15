import { StatusCodes } from '../htttp-statuses';

export default class AppError extends Error {
  statusCode: StatusCodes;
  isOperational: boolean;
  stack: string;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
