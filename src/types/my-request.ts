import { Session, SessionData } from 'express-session';

export interface MyRequest<TBody = any, TParams = any> {
  body: TBody;
  params: TParams;
  query: any;
  session: Session & Partial<SessionData>;
}

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}
