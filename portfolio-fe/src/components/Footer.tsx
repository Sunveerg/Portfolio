import React from 'react';
import './css/Footer.css';

const Footer: React.FC = (): JSX.Element => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">© 2025 Sunveer Ghumman | All Rights Reserved</p>
                <div className="footer-socials">
                    <a href="https://www.linkedin.com/in/sunveer-ghumman-507610324/" target="_blank" rel="noopener noreferrer">
                        LinkedIn <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/3536/3536505.png"} alt="linkedin" className={"social-image"}/>
                    </a>
                    <a href="https://github.com/Sunveerg" target="_blank" rel="noopener noreferrer">
                        GitHub <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/1051/1051275.png"} alt="github" className={"social-image"}/>
                    </a>
                    <a href="mailto:sunveerghum@hotmail.com">
                        Email <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/9068/9068642.png"} alt="mail" className={"social-image"}/>
                    </a>
                    <a href="sunveercv.pdf" download="sunveercv.pdf" className="cv-button">
                        Download CV<br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/2195/2195529.png"} alt="cv" className={"social-image"}/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
