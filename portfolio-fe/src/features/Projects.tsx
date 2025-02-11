/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects, deleteProject } from './api/getProject';
import { useNavigate } from 'react-router-dom';
import '../components/css/ProjectsPage.css';

const Projects: React.FC = (): JSX.Element => {
    const [projectItems, setProjectItems] = useState<projectResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();


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
                                <button className="delete-button" onClick={() => handleDelete(item.projectId)}>
                                    ❌
                                </button>&nbsp;
                                <button className="edit-button" onClick={() => navigate(`/updateProject/${item.projectId}`)}>
                                    ✏️️
                                </button>
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
