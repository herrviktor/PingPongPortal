import type { IUser } from "../interfaces/interfaces";

const API_BASE = "http://localhost:3000/auth";

export const register = async (userData: IUser) => {
    const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "registrering misslyckades");
    }
    return res.json();
};

export const login = async (credentials: IUser) => {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Inloggning misslyckades");
    }
    return res.json();
};
