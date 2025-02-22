import * as React from 'react';
import { FormEvent, JSX, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSunveer, updateSunveer } from './api/getAllSunveer';
import { sunveerRequestModel, quotesRequestModel } from '@/features/model/sunveerRequestModel';
import '../components/css/UpdateSunveer.css';

interface ApiError {
    message: string;
}

const UpdateSunveer: React.FC = (): JSX.Element => {
    const { sunveerId } = useParams<{ sunveerId: string }>();
    const [sunveer, setSunveer] = useState<sunveerRequestModel>({
        skills: '',
        hobbies: '',
        description: '',
        quotesList: [],
    });
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSunveer = async () => {
            if (sunveerId) {
                try {
                    const response = await getAllSunveer();
                    const sunveerData = response.find(item => item.sunveerId === sunveerId);
                    if (sunveerData) {
                        setSunveer(sunveerData);
                    }
                } catch (error) {
                    console.error(`Error fetching Sunveer data with id ${sunveerId}`, error);
                }
            }
        };
        fetchSunveer().catch(error => console.error('Error fetching Sunveer data', error));
    }, [sunveerId]);

    const validate = (): boolean => {
        const newError: { [key: string]: string } = {};
        if (!sunveer.skills) newError.skills = 'Skills are required';
        if (!sunveer.hobbies) newError.hobbies = 'Hobbies are required';
        if (!sunveer.description) newError.description = 'Description is required';
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        setShowNotification(false);

        try {
            if (sunveerId) {
                await updateSunveer(sunveerId, sunveer);
                setSuccessMessage('Sunveer updated successfully');
                setShowNotification(true);
                setTimeout(() => navigate('/sunveer'), 2000);
            }
        } catch (error) {
            const apiError = error as ApiError;
            setErrorMessage(`Error updating Sunveer: ${apiError.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleQuoteChange = (index: number, field: keyof quotesRequestModel, value: string) => {
        const updatedQuotes = sunveer.quotesList.map((quote, i) =>
            i === index ? { ...quote, [field]: value } : quote
        );
        setSunveer(prev => ({ ...prev, quotesList: updatedQuotes }));
    };

    const addQuote = () => {
        setSunveer(prev => ({ ...prev, quotesList: [...prev.quotesList, { quote: '', author: '' }] }));
    };

    const removeQuote = (index: number) => {
        setSunveer(prev => ({ ...prev, quotesList: prev.quotesList.filter((_, i) => i !== index) }));
    };

    return (
        <div className="edit-sunveer-form">
            <h3 className="text-center">
                Sunveer &nbsp;
                <small className="text-muted">Edit Form</small>
            </h3>
            {loading && <div className="loader">Loading...</div>}
            <br />
            <div className="container">
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="form-group">
                        <label>Skills</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sunveer.skills}
                            onChange={e => setSunveer(prev => ({ ...prev, skills: e.target.value }))}
                            required
                        />
                        {error.skills && <div className="text-danger">{error.skills}</div>}
                    </div>
                    <div className="form-group">
                        <label>Hobbies</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sunveer.hobbies}
                            onChange={e => setSunveer(prev => ({ ...prev, hobbies: e.target.value }))}
                            required
                        />
                        {error.hobbies && <div className="text-danger">{error.hobbies}</div>}
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={sunveer.description}
                            onChange={e => setSunveer(prev => ({ ...prev, description: e.target.value }))}
                            required
                        />
                        {error.description && <div className="text-danger">{error.description}</div>}
                    </div>
                    <div className="form-group">
                        <label>Quotes</label>
                        {sunveer.quotesList.map((quote, index) => (
                            <div key={index} className="quote-entry">
                                <input
                                    type="text"
                                    placeholder="Quote"
                                    value={quote.quote}
                                    onChange={e => handleQuoteChange(index, 'quote', e.target.value)}
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={quote.author}
                                    onChange={e => handleQuoteChange(index, 'author', e.target.value)}
                                    className="form-control"
                                />
                                <button type="button" onClick={() => removeQuote(index)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addQuote} className="btn btn-secondary">Add Quote</button>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {showNotification && <div className="notification"><p>{successMessage}</p></div>}
        </div>
    );
};

export default UpdateSunveer;
