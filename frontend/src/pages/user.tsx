import { useEffect, useState } from "react";
import { deleteBooking, getUserBookings } from "../services/bookingService";
import type { IBooking } from "../interfaces/interfaces";
import CButton from "../components/Button";

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
            <h2 className="main-h2 text-center">Mina bokningar</h2>

            {loading && <p className="text-gray-500 italic">Laddar bokningar...</p>}
            {error && <p className="text-red-600 font-medium">{error}</p>}
            {!loading && bookings.length === 0 && (
                <p className="text-gray-600 text-center text-xl">Du har inga bokningar. Gå till Hem för att boka</p>
            )}

            <ul className="mt-4">
                {bookings.map((b) => (
                    <li
                        key={b._id}
                        className="flex items-center justify-center flex-col md:flex-row gap-1 py-4 px-2 rounded-md"
                    >
                        <div className="flex items-center flex-col sm:flex-row">
                            <span className="user-span">{b.facility.name}</span>
                            <span className="user-span">{b.date.slice(0, 10)}</span>
                            <span className="user-span">kl {b.time}</span>
                            <span className="user-span">{b.facility.hourlyRate} kr</span>
                        </div>

                        <CButton
                            onClick={() => handleDelete(b._id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded transition"
                        >
                            Avboka
                        </CButton>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default User;