const API_BASE = "http://localhost:3000/facilities";

export const getAllFacilities = async () => {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta sporthallar");
    }
    return res.json();
};

export const getFacilityById = async (id: string): Promise<any> => {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta sporthallen");
    }
    return res.json();
};

export const getTimeslotsForDate = async (facilityId: string, date: string) => {
    const res = await fetch(`${API_BASE}/${facilityId}/availebleDates/${date}/timeslots`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kunde inte hämta tider");
    }
    return res.json();
};