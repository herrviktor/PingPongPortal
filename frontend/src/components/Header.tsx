import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { searchFacilities } from "../services/facilityService";
import { useState } from "react";
import type { IFormErrors, ISearchFacility } from "../interfaces/interfaces";
import CButton from "./Button";
import Dropdown from "./DropDown";
import { handleBlur, sanitize, validateSearch } from "../utils/validators";

interface HeaderProps {
    onSearchResults: (results: ISearchFacility[] | null) => void;
};

const Header = ({ onSearchResults }: HeaderProps) => {

    const { logout, user } = useAuth();
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [searchErrors, setSearchErrors] = useState<IFormErrors>({});
    const navigate = useNavigate();

    const handleSearchClick = async () => {
        setError("");
        try {
            if (query.length > 0) {
                const data = await searchFacilities(query);
                onSearchResults(data);
            } else {
                onSearchResults(null);
            }
            navigate("/");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Fel vid sökning");
            } else {
                setError("Ett okänt fel inträffade");
            }
            onSearchResults(null);
        }
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = sanitize(e.target.value);
        setQuery(value);

        if (searchErrors.search) {
            if (validateSearch(value)) {
                setSearchErrors({ search: "" });
            } else {
                setSearchErrors({ search: "mellan 1 och 50 tecken" });
            }
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
                        name="search"
                        onChange={handleQueryChange}
                        onBlur={handleBlur("search", setSearchErrors)}
                        className="searchInput"
                    />
                    <CButton onClick={handleSearchClick}>Sök</CButton>
                    {searchErrors.search && <p className="error-text">{searchErrors.search}</p>}
                    {error && <p className="error-text">{error}</p>}
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
            {user &&
                <p className="text-green-500 text-xs sm:text-sm xl:text-lg">Inloggad som: {user.username}</p>
            }

        </header>
    )
}

export default Header;
