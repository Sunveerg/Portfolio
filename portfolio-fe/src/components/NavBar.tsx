import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('EN');
    const location = useLocation(); // Get the current location
    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'EN';
        setCurrentLanguage(savedLanguage);

        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLanguageChange = (lang: string) => {
        const googleTranslateElement = document.querySelector(
            '.goog-te-combo'
        ) as HTMLSelectElement;

        if (googleTranslateElement) {
            googleTranslateElement.value = lang;
            googleTranslateElement.dispatchEvent(new Event('change'));

            setTimeout(() => {
                const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
                if (iframe) {
                    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
                    if (iframeDocument) {
                        const langOptions = iframeDocument.querySelectorAll('.goog-te-menu2-item span.text');
                        langOptions.forEach((option) => {
                            if (option.textContent?.trim().toLowerCase() === lang) {
                                (option as HTMLElement).click();
                            }
                        });
                    }
                }
            }, 500);

            localStorage.setItem('language', lang === 'en' ? 'EN' : 'FR');
            setCurrentLanguage(lang === 'en' ? 'EN' : 'FR'); // Update the UI state
        } else {
            console.error('Google Translate dropdown not found');
        }

        // Trigger page refresh after the language change
        setTimeout(() => {
            window.location.reload();
        }, 1000);  // Adjust the timeout value if needed to ensure the language change is applied before refreshing
    };

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
            <div id="google_translate_element" style={{ display: 'none' }}></div>{' '}
            <div className="navbar-container">
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <li>
                        <Link
                            to="/home"
                            className={`nav-link notranslate ${isActive('/home') ? 'active' : ''}`} // Add active class conditionally
                            onClick={() => setMenuOpen(false)}
                        >
                            {currentLanguage === 'FR' ? 'Accueil' : 'Home'}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sunveer"
                            className={`nav-link ${isActive('/sunveer') ? 'active' : ''}`} // Add active class conditionally
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/projects"
                            className={`nav-link ${isActive('/projects') ? 'active' : ''}`} // Add active class conditionally
                            onClick={() => setMenuOpen(false)}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/comments"
                            className={`nav-link ${isActive('/comments') ? 'active' : ''}`} // Add active class conditionally
                            onClick={() => setMenuOpen(false)}
                        >
                            Comments
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="dropdown">
                <button className="navItem">
                    {currentLanguage} {/* Display current language */}
                </button>
                <div className="dropdownContent">
                    <button onClick={() => handleLanguageChange('en')}>
                        English
                    </button>
                    <button onClick={() => handleLanguageChange('fr')}>French</button>
                </div>
            </div> &nbsp;

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
