import { JwtPayload } from 'jsonwebtoken';

export interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

export interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
}

export interface IJwtPayload {
  id: string;
  email: string;
  isAdmin?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export {};