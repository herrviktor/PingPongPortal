import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { searchFacilities } from "../services/facilityService";
import { useState } from "react";
import type { ISearchFacility } from "../interfaces/interfaces";
import CButton from "./Button";
import CInput from "./Input";
import Dropdown from "./DropDown";

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
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center">
                <img src="../../public/bilder/icon.png" className="w-9 h-9" />
                <h1>PingPongPortal</h1>
              </div>
              {user && (
                <div>
                  <CInput
                    type="text"
                    placeholder="Sök anläggning..."
                    value={query}
                    onChange={onSearchChange}
                    ariaLabel="Sök anläggning"
                  />

                  {error && <div style={{ color: "red" }}>{error}</div>}

                </div>
              )}
            </div>
            <nav className="">
                <ul className="hidden sm:flex justify-around items-center my-4">
                    <li><CButton to="/">Hem</CButton></li>
                    {user && <li><CButton to="/user">Min sida</CButton></li>}
                    {user && <li><CButton to="/admin">Admin</CButton></li>}
                    <li><CButton to="/booking-terms">Bokningsvilkor</CButton></li>
                    {!user && <li><CButton to="/auth">Register/LoggaIn</CButton></li>}
                    {user && <li><CButton onClick={logout}>Logga ut</CButton></li>}
                </ul>
            </nav>
            <div className="flex justify-end sm:hidden">
              <Dropdown />
            </div>

        </header>
    )
}

export default Header;