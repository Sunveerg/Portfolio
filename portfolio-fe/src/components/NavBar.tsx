import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLoginRedirect = () => {
        setLoading(true);
        const audience = "https://dev-bwwn1gqnz1pbm8ay.us.auth0.com/api/v2/";
        const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

        window.location.href =
            `https://dev-bwwn1gqnz1pbm8ay.us.auth0.com/authorize?` +
            `response_type=token&` +
            `client_id=${clientId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=openid profile email read:current_user read:roles&` +
            `audience=${audience}&` +
            `prompt=login`;
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        setIsAuthenticated(false);
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <li>
                        <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/sunveer" className="nav-link" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/comments" className="nav-link" onClick={() => setMenuOpen(false)}>
                            Comments
                        </Link>
                    </li>
                </ul>
            </div>

            {loading ? (
                <button className="login-button" disabled>
                    Redirecting to Auth0...
                </button>
            ) : isAuthenticated ? (
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            ) : (
                <button onClick={handleLoginRedirect} className="login-button">
                    Login
                </button>
            )}
        </nav>
    );
};

export default Navbar;
