/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects, deleteProject } from './api/getProject';
import { useNavigate } from 'react-router-dom';
import '../components/css/ProjectsPage.css';

const Projects: React.FC = (): JSX.Element => {
    const [projectItems, setProjectItems] = useState<projectResponseModel[]>([]);
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
                // Decode token payload
                const base64Url = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));

                console.log('Decoded JWT Payload:', decodedPayload); // Debugging

                // Extract roles from token (adjust the key to match your Auth0 setup)
                const roles: string[] = decodedPayload['https://portfolio/roles'] || [];
                console.log('Extracted Roles:', roles); // Debugging

                setIsAdmin(roles.includes('Admin'));

                const response = await fetch(
                    'https://dev-bwwn1gqnz1pbm8ay.us.auth0.com/userinfo',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

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
        const fetchProjectsData = async (): Promise<void> => {
            try {
                setLoading(true);
                const response = await getAllProjects();
                if (Array.isArray(response)) {
                    setProjectItems(response);
                } else {
                    console.error('Fetched data is not an array:', response);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectsData();
    }, []);

    const handleDelete = async (projectId: string) => {
        try {
            await deleteProject(projectId); // Call the delete API
            setProjectItems(prevItems => prevItems.filter(item => item.projectId !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="top-section">
            <div className="project-list">
                {projectItems.length > 0 ? (
                    projectItems.map(item => (
                        <div
                            className="project-item"
                            key={item.projectId}
                        >
                            <div className="item-content">
                                <a href={item.projectLink}>
                                    <p className="project-name"><b>Project Name:</b> {item.projectName}</p>
                                    <p className="project-description"><b>Project Description:</b> {item.projectDescription}</p>
                                    <img className="project-image" alt={"project"} src={item.projectImage}></img>
                                    <p className="team-size"><b>Team Size:</b> {item.projectTeamSize}</p>
                                </a>
                                {isAdmin && (
                                    <>
                                        <button className="delete-button" onClick={() => handleDelete(item.projectId)}>
                                            ❌
                                        </button>&nbsp;
                                        <button className="edit-button" onClick={() => navigate(`/updateProject/${item.projectId}`)}>
                                            ✏️️
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-items">No items available</p>
                )}
            </div>

            <button onClick={() => navigate('/addProject')} >Add</button>

        </div>
    );
};

export default Projects;
