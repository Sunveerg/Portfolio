import React from 'react';
import '../components/css/HomePage.css';
import {useNavigate} from "react-router-dom";

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/sunveer');
    };

  return (
    <main className="homePage">
      {/* Left Section: Text Content */}
      <div className="welcomeText">
        <h4>Welcome</h4>
        <h1>
          Sunveer Ghumman
        </h1>
        <p className="paragraph}=">
       PORTFOLIO
        </p>
          <button onClick={handleEnterClick}>Enter Porfolio</button>
      </div>
    </main>
  );
};
