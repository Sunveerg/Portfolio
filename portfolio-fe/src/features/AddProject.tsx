import * as React from 'react';
import { FormEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProject } from './api/getProject';
import { projectRequestModel } from './model/projectRequestModel';
import '../components/css/AddProject.css';

interface ApiError {
    message: string;
}

const AddProject: React.FC = (): JSX.Element => {
    const [project, setProject] = useState<projectRequestModel>({
        projectName: '',
        projectDescription: '',
        projectLink: '',
        projectImage: '',
        projectTeamSize: 1,
    });

    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    const validate = (): boolean => {
        const newError: { [key: string]: string } = {};
        if (!project.projectName) {
            newError.projectName = 'Project name is required';
        }
        if (!project.projectDescription) {
            newError.projectDescription = 'Project description is required';
        }
        if (!project.projectLink) {
            newError.projectLink = 'Project link is required';
        }
        if (!project.projectTeamSize || project.projectTeamSize < 1) {
            newError.projectTeamSize = 'Project team size must be at least 1';
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        setShowNotification(false);

        try {
            await addProject(project);
            setSuccessMessage('Project added successfully');
            setShowNotification(true);
            setTimeout(() => {
                navigate('/projects'); // Redirect after success
            }, 2000);
        } catch (error) {
            const apiError = error as ApiError;
            setErrorMessage(`Error adding project: ${apiError.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-project-form">
            <h3 className="text-center">Add Project</h3>
            {loading && <div className="loader">Loading...</div>}
            <br />
            <div className="container">
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type='text'
                            name='projectName'
                            placeholder='Enter project name'
                            className='form-control'
                            value={project.projectName}
                            onChange={e =>
                                setProject(prev => ({ ...prev, projectName: e.target.value }))
                            }
                            required
                        />
                        {error.projectName && (
                            <div className="text-danger">{error.projectName}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Project Description</label>
                        <textarea
                            name='projectDescription'
                            placeholder='Enter project description'
                            className='form-control'
                            value={project.projectDescription}
                            onChange={e =>
                                setProject(prev => ({ ...prev, projectDescription: e.target.value }))
                            }
                            required
                        />
                        {error.projectDescription && (
                            <div className="text-danger">{error.projectDescription}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Project Link</label>
                        <input
                            type='text'
                            name='projectLink'
                            placeholder='Enter project link'
                            className='form-control'
                            value={project.projectLink}
                            onChange={e =>
                                setProject(prev => ({ ...prev, projectLink: e.target.value }))
                            }
                            required
                        />
                        {error.projectLink && (
                            <div className="text-danger">{error.projectLink}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Image Link</label>
                        <input
                            type='text'
                            name='imageLink'
                            placeholder='Enter image link'
                            className='form-control'
                            value={project.projectImage}
                            onChange={e =>
                                setProject(prev => ({ ...prev, projectImage: e.target.value }))
                            }
                        />
                        {error.projectLink && (
                            <div className="text-danger">{error.projectLink}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Project Team Size</label>
                        <input
                            type='number'
                            name='projectTeamSize'
                            placeholder='Enter team size'
                            className='form-control'
                            value={project.projectTeamSize}
                            onChange={e =>
                                setProject(prev => ({ ...prev, projectTeamSize: parseInt(e.target.value, 10) }))
                            }
                            required
                        />
                        {error.projectTeamSize && (
                            <div className="text-danger">{error.projectTeamSize}</div>
                        )}
                    </div>
                    <br />
                    <button type='submit' className='btn btn-primary'>
                        Submit Project
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

export default AddProject;
