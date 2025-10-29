const API_BASE = "http://localhost:3000/bookings";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getUserBookings = async () => {
  const res = await fetch(API_BASE, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Kunde inte hämta bokningar");
  }
  return res.json();
};

export const createBooking = async (facilityId: string, date: string, time: string) => {
  const res = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ facilityId, date, time }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Bokningen misslyckades");
  }
  return data;
};

export const deleteBooking = async (bookingId: string) => {
  const res = await fetch(`${API_BASE}/delete/${bookingId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Kunde inte radera bokningen");
  }
  return true;
};
