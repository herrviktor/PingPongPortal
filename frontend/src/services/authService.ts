export interface IUser {
    id?: string;
    username?: string;
    email: string;
    password: string;
}

const API_BASE = "http://localhost:3000";

export const register = async (userData: IUser) => {
    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "registrering misslyckades");
        }
        return res.json();
    } catch (error) {
        console.error("Registrerings fel", error);
        throw error;
    } 
}

export const login = async (credentials: IUser) => {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Inloggning misslyckades");
        }
        return res.json();
    } catch (error) {
        console.error("Login fel:", error);
    }
};