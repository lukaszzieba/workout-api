import { StatusCodes } from '../htttp-statuses';

export default class AppError extends Error {
  statusCode: StatusCodes;
  isOperational: boolean;
  stack: string;
  details: any[];

  constructor(
    statusCode: number,
    message: string,
    details: any[] = [],
    isOperational = true,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
