import { createContext, useState, type ReactNode } from "react";
import * as authService from '../services/authService';
import type { IUser } from "../services/authService";

export interface IAuthContext {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (formData: IUser) => Promise<void>;
    logout: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (email: string, password: string):Promise<void> => {
        const data = await authService.login({ email, password});
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    };

    const register = async (formData: IUser) => {
        await authService.register(formData);
        return login(formData.email, formData.password);
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};