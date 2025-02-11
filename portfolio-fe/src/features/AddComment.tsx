import * as React from 'react';
import { FormEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComment } from './api/getComments';
import '../components/css/AddComment.css';

interface ApiError {
    message: string;
}

const AddComment: React.FC = (): JSX.Element => {
    const [commentData, setCommentData] = useState({
        author: '',
        comment: '',
    });

    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    const validate = (): boolean => {
        const newError: { [key: string]: string } = {};
        if (!commentData.author) {
            newError.author = 'Author is required';
        }
        if (!commentData.comment) {
            newError.comment = 'Comment is required';
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        setShowNotification(false);

        try {
            await addComment({
                ...commentData,
                date: new Date(),
                isApproved: false,
            });
            setSuccessMessage('Comment added successfully');
            setShowNotification(true);
            setTimeout(() => {
                navigate('/comments'); // Redirect after success
            }, 2000);
        } catch (error) {
            const apiError = error as ApiError;
            setErrorMessage(`Error adding comment: ${apiError.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-comment-form">
            <h3 className="text-center">Add Comment</h3>
            {loading && <div className="loader">Loading...</div>}
            <br />
            <div className="container">
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type='text'
                            name='author'
                            placeholder='Enter your name'
                            className='form-control'
                            value={commentData.author}
                            onChange={e =>
                                setCommentData(prev => ({ ...prev, author: e.target.value }))
                            }
                            required
                        />
                        {error.author && <div className="text-danger">{error.author}</div>}
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea
                            name='comment'
                            placeholder='Enter your comment'
                            className='form-control'
                            value={commentData.comment}
                            onChange={e =>
                                setCommentData(prev => ({ ...prev, comment: e.target.value }))
                            }
                            required
                        />
                        {error.comment && <div className="text-danger">{error.comment}</div>}
                    </div>
                    <br />
                    <button type='submit' className='btn btn-primary'>
                        Submit Comment
                    </button>
                </form>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {showNotification && (
                <div className="notification">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default AddComment;