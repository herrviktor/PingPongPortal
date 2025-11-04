import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { searchFacilities } from "../services/facilityService";
import { useState } from "react";
import type { ISearchFacility } from "../interfaces/interfaces";
import CButton from "./Button";
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
       console.log("Header: sökresultat:", data);
       onSearchResults(data);
     } else {
       console.log("Header: tömmer sökresultat");
       onSearchResults(null);
     }
   } catch (err) {
        if (err instanceof Error) {
            setError(err.message || "Fel vid sökning");;
        }
        else {
            setError("Ett okänt fel inträffade");
        }
        console.log("Header: sökfel, tömmer resultat");
        onSearchResults(null);
  }
};


    return (
        <header>
            <div className="gFlexB pt-3 mb-3">
              <div className="gFlexS flex-col">
                <div className="gFlexS pl-3">
                  <img src="/bilder/icon.png" className="w-5 h-auto sm:w-7 xl:w-15" />
                  <h1 className="header-logo">PingPongPortal</h1>
                </div>
                <p className="header-sub">En bokningssida för pingis entuiaster</p>
              </div>
              <div className="pr-0.5">
                <input 
                  type="text"
                  placeholder="Sök Pingishall..."
                  value={query}
                  onChange={onSearchChange}
                  className="searchInput"
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
            </div>
            <nav className="">
                <ul className="hidden sm:flex justify-around items-center mt-6 mb-4">
                    <li><CButton to="/">Hem</CButton></li>
                    <li><CButton to="/booking-terms">Bokningsvilkor</CButton></li>
                    {user?.isAdmin && <li><CButton to="/admin">Admin</CButton></li>}
                    {user && (
                      <>
                        <li><CButton to="/user">Min sida</CButton></li>
                        <li><CButton onClick={logout}>Logga ut</CButton></li>
                      </>
                    )}
                    {!user && <li><CButton to="/auth">LoggaIn/Registrera</CButton></li>}
                </ul>
            </nav>
            <div className="flex justify-end sm:hidden">
              <Dropdown />
            </div>

        </header>
    )
}

export default Header;
