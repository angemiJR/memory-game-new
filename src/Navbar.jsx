import { Link } from "react-router-dom";
import "./styles/Navbar.css"

function Navbar () {

    const userName = "Ferret";

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/">New Game</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                    <li><Link to="/sign-up">Sign up</Link></li>
                    <li><Link to="/user-info">{userName}</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;