import React from "react";
import "./css/Footer.css";

const Footer: React.FC = (): JSX.Element => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">© 2025 Sunveer Ghumman | All Rights Reserved</p>
                <div className="footer-socials">
                    <a href="https://www.linkedin.com/in/sunveer-ghumman-507610324/" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="LinkedIn" className="social-image" />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/Sunveerg" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <img src="https://cdn-icons-png.flaticon.com/128/1051/1051275.png" alt="GitHub" className="social-image" />
                        <span>GitHub</span>
                    </a>
                    <a href="mailto:sunveerghum@hotmail.com" className="footer-link">
                        <img src="https://cdn-icons-png.flaticon.com/128/9068/9068642.png" alt="Email" className="social-image" />
                        <span>Email Me</span>
                    </a>
                    <a href="sunveercv.pdf" download="sunveercv.pdf" className="footer-link">
                        <img src="https://cdn-icons-png.flaticon.com/128/2195/2195529.png" alt="CV" className="social-image" />
                        <span>Download CV</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
