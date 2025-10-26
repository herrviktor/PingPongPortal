import { useEffect, useState } from "react";
import type { ITimeslot, IFacility } from "../interfaces/interfaces";
import { getAllFacilities, getTimeslotsForDate } from "../services/facilityService";


const Index: React.FC = () => {
    const [facilities, setFacilities] = useState<Pick<IFacility, "_id" | "name">[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            <h2>Hitta tider</h2>
            {error && <p>{error}</p>}
            
            <h3>Välj Pingishall</h3>
            <select 
                value={selectedFacility ?? ""}
                onChange={(e) => setSelectedFacility(e.target.value)}
            >
                {facilities.map((f) => (
                    <option key={f._id} value={f._id}>
                        {f.name}
                    </option>
                ))}
            </select>
            <h3>Välj datum</h3>
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <h3>Tider att boka</h3>
            <ul>
                {timeslots.map((t, i) => (
                    <li key={i}>
                        {t.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;