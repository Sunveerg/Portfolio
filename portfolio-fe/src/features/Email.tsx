import * as React from 'react';
import {FormEvent, useState} from 'react';
import { emailRequestModel } from "./model/emailRequestModel";
import { sendEmail } from "./api/sendMail";
import '../components/css/Email.css';
import {useNavigate} from "react-router-dom";

const Email: React.FC = (): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!name || !message) {
            setStatus('Please fill in both fields.');
            return;
        }

        const emailRequest: emailRequestModel = {
            to: 'sunveerghum@hotmail.com',
            subject: `Portfolio Email`,
            body: `<b>Name:</b> ${name}<br>
                   <b>Message:</b> ${message}`,
        };

        try {
            await sendEmail(emailRequest);
            setStatus('Email sent successfully!');
            setTimeout(() => {
                navigate('/sunveer');
            }, 2000);
        } catch (error) {
            setStatus('Failed to send email. Please try again later.');
        }
    };

    return (
        <div className="email-div">
            <h2 className="email-h2">Send an Email</h2>
            <form className="email-form" onSubmit={handleSubmit}>
                <div className="email-div">
                    <label className="email-label" htmlFor="name">Your Name:</label>
                    <input
                        className="email-input"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="email-div">
                    <label className="email-label" htmlFor="message">Your Message:</label>
                    <textarea
                        className="email-textarea"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button className="email-button" type="submit">Send Email</button>
            </form>
            {status && <p className="email-p">{status}</p>}
        </div>
    );
};

export default Email;
