import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CDropButton from "./DropButton";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full drop-button border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Meny
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="origin-top-right absolute right-1 mt-2 ml-1 min-w-40 shadow-lg drop-button ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <li>
            <CDropButton onClick={() => { navigate("/"); setIsOpen(false); }}>
                Hem
            </CDropButton>
          </li>
          <li>
              <CDropButton onClick={() => { navigate("/booking-terms"); setIsOpen(false); }}>
                  Bokningsvilkor
              </CDropButton>
          </li>
          {user && (           
              <li>
                <CDropButton onClick={() => { navigate("/admin"); setIsOpen(false); }}>
                      Admin
                  </CDropButton>
              </li>            
          )}
          {user && (
            <>
              <li>
                <CDropButton onClick={() => { navigate("/user"); setIsOpen(false); }}>
                    Min Sida
                </CDropButton>
              </li>
              <li>
                <CDropButton onClick={() => { handleLogout(); setIsOpen(false); }}>
                    Logga ut
                </CDropButton>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <CDropButton onClick={() => { navigate("/auth"); setIsOpen(false); }}>
                      Logga in/Registrera
                  </CDropButton>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
