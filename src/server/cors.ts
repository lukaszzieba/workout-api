import cors from 'cors';

import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';

const corsWhitelist = [process.env.CORS_ORIGIN, 'http://localhost:4000'];

export default cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);

      return;
    }

    if (origin && corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AppError(StatusCodes.FORBIDDEN, 'Not allowed by CORS'));
    }
  },
  credentials: true,
});
