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
                const base64Url = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));
                const roles: string[] = decodedPayload['https://portfolio/roles'] || [];
                setIsAdmin(roles.includes('Admin'));
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
                    // Reorder projects so that projectId2 appears first
                    const reorderedProjects = response.sort((a, b) => {
                        if (a.projectId === 'project2') return -1; // Move projectId2 to the front
                        if (b.projectId === 'project2') return 1; // Keep other projects in place
                        return 0; // Keep other projects in the same order
                    });
                    setProjectItems(reorderedProjects);
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
            await deleteProject(projectId);
            setProjectItems(prevItems => prevItems.filter(item => item.projectId !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return <div className="loading-spinner">⏳ Loading projects...</div>;
    }

    return (
        <div className="top-section">
            <h1 className="page-title"> My Projects</h1>
            <div className="project-list">
                {projectItems.length > 0 ? (
                    projectItems.map(item => (
                        <div className="project-item" key={item.projectId}>
                            <div className="item-content">
                                <a href={item.projectLink} className="project-link">
                                    <p className="project-name">{item.projectName}</p>
                                    <p className="project-description">{item.projectDescription}</p>
                                    <img className="project-image" alt="project" src={item.projectImage} />
                                    <p className="team-size">👥 Team Size: {item.projectTeamSize}</p>
                                </a>
                                {isAdmin && (
                                    <div className="admin-buttons">
                                        <button className="delete-button" onClick={() => handleDelete(item.projectId)}>❌</button>
                                        <button className="edit-button" onClick={() => navigate(`/updateProject/${item.projectId}`)}>✏️</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-items">🚫 No projects available</p>
                )}
            </div>

            {isAdmin && (
                <button className="add-button" onClick={() => navigate('/addProject')}>➕ Add Project</button>
            )}
        </div>
    );
};

export default Projects;