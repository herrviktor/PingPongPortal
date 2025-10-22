import type {ReactNode} from 'react'

export interface IUser {
    _id?: string;
    username?: string;
    email: string;
    password: string;
}

export interface IAuthContext {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (formData: IUser) => Promise<void>;
    logout: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}