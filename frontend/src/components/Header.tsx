import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {

    const {logout} = useAuth();

    return (
        <header>
            <div>
                <h1>Min App</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Hem</Link></li>
                    <li><Link to="/auth">Register/LoggaIn</Link></li>
                    <li><Link to="/user">Min sida</Link></li>
                    <li><Link to="/info">Bokningsvilkor</Link></li>
                </ul>
            </nav>
            <Link to="/" onClick={logout}>Logga ut</Link>
        </header>
    )
}

export default Header;