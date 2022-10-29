import { Session, SessionData } from 'express-session';

export interface MyRequest<TBody = any> {
  body: TBody;
  params?: { id?: string };
  query?: any;
  session: Session & Partial<SessionData>;
}

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}
