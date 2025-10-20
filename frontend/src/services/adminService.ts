import type { IUser } from "../interfaces/interfaces";

const API_BASE = "http://localhost:3000/admin";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getAllUsers = async () => {
    const res = await fetch(`${API_BASE}`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta användare");
    }
    return res.json();
};

export const createUser = async (userData: IUser) => {
    const res = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Kunde inte skapa användare');
    }
    return res.json();
};

export const updateUser = async (id: string, userData: Partial<IUser>) => {
    const res = await fetch(`${API_BASE}/update/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte uppdatera användare");
    }
    return res.json();
};

export const deleteUser = async (id: string) => {
    const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte radera användare");
    }
    return res.json();
};
