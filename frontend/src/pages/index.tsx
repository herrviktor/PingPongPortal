import { useEffect, useState } from "react";
import type { ITimeslot, IFacility, ISearchFacility } from "../interfaces/interfaces";
import { getAllFacilities, getTimeslotsForDate } from "../services/facilityService";
import { createBooking } from "../services/bookingService";
import { useOutletContext } from "react-router-dom";
import CInput from "../components/Input";
import CButton from "../components/Button";
import { useAuth } from "../hooks/useAuth";

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
    const { user } = useAuth();

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

                    const today = new Date().toISOString().slice(0, 10);
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
        <div className="gFlexS flex-col pb-4">
            <h2 className="main-h2">Hitta tider</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="gFlexA w-full gap-5 flex-col md:flex-row">
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
                    {searchResults && searchResults.length > 0 && (
                        <div style={{ color: "green", marginTop: "0.5rem" }}>
                            din sökning matchade med ovan pingshallar
                        </div>
                    )}
                    <h3 className="main-h3 mt-5">Välj datum (inom en vecka)</h3>
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
                            <div className="indexBookingCol bg-green-600"></div>
                            <span className="indexBookingText">Bokningsbar</span>
                        </div>
                        <div className="gFlexS w-full gap-1">
                            <div className="indexBookingCol bg-red-500"></div>
                            <span className="indexBookingText">Ej Bokningsbar</span>
                        </div>
                    </div>
                    <p className="text-sm sm:text-lg xl:text-2xl my-0 border-5 border-[#F38D44]">
                        Du klickar på de bokningsbara tiderna för att boka<br />
                        tiden. Klicka sedan på knappen "mina bokade tider"<br />
                        för att komma till din sida med det bokade tiderna.
                    </p>
                    {timeslots.length > 0 ? (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 border index-border rounded px-2 py-2 mt-0 mb-4">
                            {timeslots.map((t, i) => (
                                <li
                                    key={i}
                                    onClick={() => !t.isBooked && handleBooking(t.time)}
                                    style={{ cursor: t.isBooked ? "not-allowed" : "pointer" }}
                                    className={`text-lg sm:text-xl xl:text-2xl bg-green-600 p-2 border index-border ${t.isBooked ? "bg-red-500 cursor-not-allowed" : "hover:bg-gray-100"} cursor-pointer`}
                                >
                                    {t.isBooked ? "Bokad" : t.time}
                                </li>
                            ))}
                        </ul>
                    ) : <p className="index-border indexBookingText rounded px-2 py-2 mt-0 mb-4 text-red-600">Finns inga tider för detta datum</p>
                    }
                    {bookingMessage &&
                        <p className="mt-4 mb-4 text-xl text-gray-700">{bookingMessage}</p>
                    }
                    {user &&
                        <CButton to="/user" className="mt-4">Se dina tider</CButton>
                    }
                </div>
            </div>
        </div>
    );
};

export default Index;