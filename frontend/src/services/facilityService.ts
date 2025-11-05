import type { IFacility, ITimeslot } from "../interfaces/interfaces";

const API_BASE = `${import.meta.env.VITE_API_URL}/facilities`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getAllFacilities = async (): Promise<Pick<IFacility, "_id" | "name">[]> => {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta sporthallar");
    }
    return res.json();
};

export const getFacilityById = async (id: string): Promise<IFacility> => {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta sporthallen");
    }
    return res.json();
};

export const getTimeslotsForDate = async (facilityId: string, date: string): Promise<ITimeslot[]> => {
    const res = await fetch(`${API_BASE}/${facilityId}/availableDates/${date}/timeslots`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta tider");
    }
    return res.json();
};

export const searchFacilities = async (query: string) => {
    if (query.length < 1) {
        return [];
    }
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Sökfel");
    }
    return res.json();
};
