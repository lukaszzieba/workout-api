import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

import { COOKIE_NAME, isProd } from '@utils/constans';

const redis = new Redis({
  path: process.env.REDIS_URL as string,
  db: 1,
});
const redisStore = connectRedis(session);

export default session({
  name: COOKIE_NAME,
  store: new redisStore({
    client: redis,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    domain: isProd ? '.finchdev.com ' : undefined,
  },
  saveUninitialized: false,
  secret: (process.env.SECRET as string) || 'secret',
  resave: false,
});
