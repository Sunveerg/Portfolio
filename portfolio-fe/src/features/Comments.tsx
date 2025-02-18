/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect} from 'react';
import { commentResponseModel } from './model/commentResponseModel';
import { getApprovedComments, getUnapprovedComments, approveComment, deleteComment } from './api/getComments';
import '../components/css/CommentsPage.css';
import { useNavigate } from 'react-router-dom';

const Comments: React.FC = (): JSX.Element => {
    const [approvedComments, setApprovedComments] = useState<commentResponseModel[]>([]);
    const [unapprovedComments, setUnapprovedComments] = useState<commentResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                console.error('No access token found');
                setLoading(false);
                return;
            }

            try {
                const base64Url = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));

                setIsAdmin(decodedPayload['https://portfolio/roles'].includes('Admin'));

                const response = await fetch('https://dev-bwwn1gqnz1pbm8ay.us.auth0.com/userinfo', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchCommentsData = async (): Promise<void> => {
            try {
                setLoading(true);
                const approvedResponse = await getApprovedComments();
                setApprovedComments(Array.isArray(approvedResponse) ? approvedResponse : []);

                if (isAdmin) {
                    const unapprovedResponse = await getUnapprovedComments();
                    setUnapprovedComments(Array.isArray(unapprovedResponse) ? unapprovedResponse : []);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommentsData();
    }, [isAdmin]);

    const handleApprove = async (commentId: string) => {
        try {
            await approveComment(commentId);
            setUnapprovedComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
            const approvedComment = unapprovedComments.find(comment => comment.commentId === commentId);
            if (approvedComment) {
                setApprovedComments(prevComments => [...prevComments, approvedComment]);
            }
        } catch (error) {
            console.error('Error approving comment:', error);
        }
    };

    const handleDeleteApproved = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            setApprovedComments(prevItems => prevItems.filter(item => item.commentId !== commentId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleDeleteUnapproved = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            setUnapprovedComments(prevItems => prevItems.filter(item => item.commentId !== commentId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return <div className="loading-items">Loading comments</div>;
    }

    return (
        <div className="top-section">
            <h2 className="page-title">Comments</h2>
            <div className="comment-list">
                {approvedComments.length > 0 ? (
                    approvedComments.map(comment => (
                            <div className="comment-item" key={comment.commentId}>
                                <p className="comment-author"><b>Author:</b> {comment.author}</p>
                                <p className="comment-content"><b>Comment:</b> {comment.comment}</p>
                                {isAdmin && (
                                <button className="delete-button" onClick={() => handleDeleteApproved(comment.commentId)}>❌</button>
                                )}
                            </div>
                    ))
                ) : (
                    <p className="no-items">No approved comments available</p>
                )}
            </div>
            <button onClick={() => navigate(`/addComment`)} className="approve-button">Add Comment</button>
            {isAdmin && (
                <>
                    <h2 className="page-title"><br></br> Unapproved Comments</h2>
                    <div className="comment-list">
                        {unapprovedComments.length > 0 ? (
                            unapprovedComments.map(comment => (
                                <div className="comment-item unapproved" key={comment.commentId}>
                                    <p className="comment-author"><b>Author:</b> {comment.author}</p>
                                    <p className="comment-content"><b>Comment:</b> {comment.comment}</p>
                                    <button onClick={() => handleApprove(comment.commentId)} className="approve-button">
                                        Approve
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteUnapproved(comment.commentId)}>
                                        ❌
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-items">No unapproved comments available</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Comments;
