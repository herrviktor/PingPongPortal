import { useEffect, useState } from "react";
import { deleteBooking, getUserBookings } from "../services/bookingService";
import type { IBooking } from "../interfaces/interfaces";

const User: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getUserBookings();
        setBookings(data.bookings);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ett okänt fel inträffade");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm("Vill du verkligen radera denna bokning?")) return;
    setLoading(true);
    try {
      await deleteBooking(bookingId);
      const data = await getUserBookings();
      setBookings(data.bookings);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ett okänt fel vid radering inträffade");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Mina bokningar</h2>
      {loading && <p>Laddar bokningar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>Du har inga bokningar.</p>}
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            <strong>{b.facility.name}</strong> - {b.date.slice(0, 10)} kl {b.time}{" "}{b.facility.hourlyRate}{"kr "}
            <button onClick={() => handleDelete(b._id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;