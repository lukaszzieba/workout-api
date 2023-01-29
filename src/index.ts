import * as dotenv from 'dotenv';
dotenv.config();

import { createServer } from '@server/createServer';
import { AppError } from '@utils/error';

const PORT = process.env.PORT;

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
