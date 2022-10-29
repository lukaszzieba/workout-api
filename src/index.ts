import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import exerciseRouter from './exercise/exercise-routes';
import trainingRouter from './training/training-routes';
import userRouter from './user/user-routes';

import AppError from './utils/error/error';
import { handleError } from './utils/error/error-handler';
import { StatusCodes } from './utils/htttp-statuses';
import { isProd } from './utils/constans';

import cors from './server/cors';
import session from './server/session';

const PORT = 3000;

const app = express();
const router = express.Router();

app.set('trust proxy', !isProd);
app.set('trust proxy', 1);
app.use(cors);

app.use(compression());

app.use(session);

router.use('/exercises', exerciseRouter);
router.use('/training', trainingRouter);
router.use('/user', userRouter);

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
