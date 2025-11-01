import { useEffect, useState } from "react";
import type { ITimeslot, IFacility, ISearchFacility } from "../interfaces/interfaces";
import { getAllFacilities, getTimeslotsForDate } from "../services/facilityService";
import { createBooking } from "../services/bookingService";
import { useOutletContext } from "react-router-dom";
import CInput from "../components/Input";

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
        <div className="gFlexS flex-col">
            <h2 className="main-h2">Hitta tider</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <div className="gFlexA w-full flex-col md:flex-row">
                <div>
                    <h3 className="main-h3">Välj Pingishall</h3>
                    <select
                        className="index-select" 
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
                    <h3 className="main-h3 mt-5">Välj datum</h3>
                    <CInput
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                </div>
                <div>
                <h3 className="main-h3 mb-1">Tider att boka</h3>
                <div className="flex border-t border-x index-border px-2 py-2">
                    <div className="gFlexS w-full gap-1">
                        <div className="w-8 h-5 bg-green-600"></div>
                        <span>Bokningsbar</span>
                    </div>
                    <div className="flex w-full gap-1">
                        <div className="w-8 h-5 bg-red-500"></div>
                        <span>Ej Bokningsbar</span>
                    </div>
                </div>
                <p className="my-0 border-5 border-[#F38D44]">
                    Klicka på en av de bokningsbara tiderna för att boka tiden.<br/>
                    Klicka sedan på knappen "mina bokade tider" för att komma till<br/>
                    din sida med det bokade tiderna.
                </p>
                <ul className="grid grid-cols-3 md:grid-cols-4 gap-2 border index-border rounded px-2 py-2 mt-0">
                    {timeslots.map((t, i) => (
                    <li
                        key={i}
                        onClick={() => !t.isBooked && handleBooking(t.time)}
                        style={{ cursor: t.isBooked ? "not-allowed" : "pointer" }}
                        className={`bg-green-600 p-2 border index-border ${t.isBooked ? "bg-red-500 cursor-not-allowed" : "hover:bg-gray-100"} cursor-pointer`}
                    >
                        {t.isBooked ? "Bokad" : t.time}
                    </li>
                    ))}
                </ul>
                {bookingMessage && <p className="mt-4 text-lg text-green-700">{bookingMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Index;