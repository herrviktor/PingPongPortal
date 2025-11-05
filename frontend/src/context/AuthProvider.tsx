import { createContext, useState } from "react";
import * as authService from '../services/authService';
import type { } from "../services/authService";
import type { IAuthContext, IAuthProviderProps, IUser } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const data = await authService.login({ email, password });
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error("Inloggning misslyckades:", error);
            throw error;
        }
    };

    const register = async (formData: IUser) => {
        try {
            await authService.register(formData);
            return login(formData.email, formData.password);
        } catch (error) {
            console.error("Registrering misslyckades", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        console.log("användare utloggad");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};