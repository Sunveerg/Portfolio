import React, { useState } from 'react';
import '../components/css/HomePage.css';
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const navigate = useNavigate();

    const handleEnterClick = () => {
        setIsFolderOpen(true); // Trigger the folder opening animation
        setTimeout(() => {
            navigate('/sunveer'); // Navigate after the animation completes
        }, 1000); // Adjust this duration to match your animation time (1s)
    };

    return (
        <main>
            <div className={`homePage ${isFolderOpen ? 'folder-open' : ''}`}>
                <div className="welcomeText">
                    <h4>Welcome</h4>
                    <h1>Sunveer Ghumman</h1>
                    <p>PORTFOLIO</p>
                    <button onClick={handleEnterClick}>Enter Portfolio</button>
                </div>
            </div>
        </main>
    );
};
