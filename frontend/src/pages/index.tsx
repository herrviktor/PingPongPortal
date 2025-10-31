import { useEffect, useState } from "react";
import type { ITimeslot, IFacility, ISearchFacility } from "../interfaces/interfaces";
import { getAllFacilities, getTimeslotsForDate } from "../services/facilityService";
import { createBooking } from "../services/bookingService";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  searchResults: Pick<ISearchFacility, "_id" | "name">[] | null;
};


const Index: React.FC = () => {
    const [facilities, setFacilities] = useState<Pick<IFacility, "_id" | "name">[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [bookingMessage, setBookingMessage] = useState<string | null>(null);
    
    const { searchResults } = useOutletContext<OutletContext>();
    console.log("Index: sökresultat från outlet context:", searchResults);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await getAllFacilities();
                setFacilities(data);
                if (data.length > 0) {
                    const firstId = data[0]._id;
                    setSelectedFacility(firstId);

                    const today = new Date().toISOString().slice(0,10);
                    setDate(today);

                    const initialTimeslots = await getTimeslotsForDate(firstId, today);
                    setTimeslots(initialTimeslots);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ett okänt fel inträffade");
                }
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
        setSelectedFacility(searchResults[0]._id);
        }
    }, [searchResults]);


    useEffect(() => {
        if (!selectedFacility || !date) return;
        const fetchTimeslots = async () => {
            try {
                const newTimeslots = await getTimeslotsForDate(selectedFacility, date);
                setTimeslots(newTimeslots);
                console.log("Timeslot hämtade:", selectedFacility, date);
                setError(null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ett okänt fel inträffade");
                }
            }
        };
        fetchTimeslots();
    }, [selectedFacility, date]);

    const handleBooking = async (time: string) => {
    if (!selectedFacility || !date) return;
    setBookingMessage(null);
    try {
      await createBooking(selectedFacility, date, time);
      setBookingMessage("Bokning lyckades!");
      const updatedTimeslots = await getTimeslotsForDate(selectedFacility, date);
      setTimeslots(updatedTimeslots);
    } catch (err) {
      if (err instanceof Error) {
        setBookingMessage(err.message);
      } else {
        setBookingMessage("Okänt fel vid bokning");
      }
    } 
  };

  const optionsToShow = searchResults ?? facilities;

    return (
        <div>
            <h2>Hitta tider</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <h3>Välj Pingishall</h3>
            <select 
                value={selectedFacility ?? ""}
                onChange={(e) => setSelectedFacility(e.target.value)}
            >
                {optionsToShow.map((f) => (
                    <option key={f._id} value={f._id}>
                        {f.name}
                    </option>
                ))}

            </select>
            {optionsToShow.length === 0 && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
                Ingen pingishall matchades sökresultatet
            </div>
            )}
            <h3>Välj datum</h3>
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <h3>Tider att boka</h3>
            <ul>
                {timeslots.map((t, i) => (
                    <li
                        key={i}
                        onClick={() => !t.isBooked && handleBooking(t.time)}
                        style={{ cursor: t.isBooked ? "not-allowed" : "pointer" }}
                    >
                        {t.isBooked ? "Bokad" : t.time}
                    </li>
                ))}
            </ul>
            {bookingMessage && <p>{bookingMessage}</p>}
        </div>
    );
};

export default Index;