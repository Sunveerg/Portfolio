import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';


export const Navbar: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = 'https://dev-bwwn1gqnz1pbm8ay.us.auth0.com/api/v2/';
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

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="nav-links">
            <li>
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/sunveer" className="nav-link">About</Link>
            </li>
            <li>
              <Link to="/projects" className="nav-link">Projects</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </div>
        <button
                  onClick={handleLoginRedirect}
                  disabled={loading}
                  className="login-button"
              >
                {loading ? 'Redirecting to Auth0...' : 'Login'}
        </button>
      </nav>
  );
};

export default Navbar;