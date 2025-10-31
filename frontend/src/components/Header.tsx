import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { searchFacilities } from "../services/facilityService";
import { useState } from "react";
import type { ISearchFacility } from "../interfaces/interfaces";

interface HeaderProps {
  onSearchResults: (results: ISearchFacility[] | null) => void;
};

const Header = ({ onSearchResults }: HeaderProps) => {

    const {logout, user} = useAuth();
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   const val = e.target.value;
   setQuery(val);
   setError("");
   navigate("/")
   try {
     if (val.length > 2) {
       const data = await searchFacilities(val);
       console.log("Header: sökresultat:", data);   // <-- här
       onSearchResults(data);
     } else {
       console.log("Header: tömmer sökresultat");    // <-- här
       onSearchResults(null);
     }
   } catch (err) {
        if (err instanceof Error) {
            setError(err.message || "Fel vid sökning");;
        }
        else {
            setError("Ett okänt fel inträffade");
        }
        console.log("Header: sökfel, tömmer resultat"); // <-- här
        onSearchResults(null);
  }
};


    return (
        <header>
            <div>
                <h1>PingPongPortal</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Hem</Link></li>
                    {!user && <li><Link to="/auth">Register/LoggaIn</Link></li>}
                    {user && <li><Link to="/user">Min sida</Link></li>}
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/booking-terms">Bokningsvilkor</Link></li>
                </ul>
            </nav>
            {user && (
        <>
          <input
            type="text"
            placeholder="Sök anläggning..."
            value={query}
            onChange={onSearchChange}
            aria-label="Sök anläggning"
          />
          {error && <div style={{ color: "red" }}>{error}</div>}

          <button onClick={logout}>Logga ut</button>
        </>
      )}

        </header>
    )
}

export default Header;