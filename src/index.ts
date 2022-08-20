import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import exerciseRouter from './exercise/exercise-routes';
import AppError from './utils/error/error';
import { handleError } from './utils/error/error-handler';
import { StatusCodes } from './utils/htttp-statuses';

const PORT = 3000;

const app = express();
const router = express.Router();
router.use('/exercises', exerciseRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/v1', router);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(StatusCodes.NOT_FOUND, `Route ${req.method} ${req.url} does not exists`));
});

app.use(async (err: AppError, req: Request, res: Response, _: NextFunction) => {
  await handleError(err, res);
});

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
  console.log(process.env.NODE_ENV);
});

process.on('uncaughtException', (error: AppError, req) => {
  console.error('uncaughtException');
  if (!error.isOperational) {
    console.error(error.stack);
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  // Do something and exit
  console.log('SIGTERM');
});
