import * as dotenv from 'dotenv';
dotenv.config();

import { createServer } from './utils/createServer';
import AppError from './utils/error/error';

const PORT = 3000;

const app = createServer();

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
