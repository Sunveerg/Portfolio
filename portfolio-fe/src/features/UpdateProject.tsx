import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject } from './api/getProject';
import { projectResponseModel } from './model/projectResponseModel';
import '../components/css/UpdateProject.css';

const EditProject: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<projectResponseModel>({
        projectId: '',
        projectName: '',
        projectDescription: '',
        projectImage: '',
        projectTeamSize: 1,
        projectLink: '',
    });
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    const response = await getProjectById(projectId);
                    setProject(response);
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            }
        };
        fetchProject();
    }, [projectId]);

    const validate = (): boolean => {
        const newError: { [key: string]: string } = {};
        if (!project.projectName) newError.projectName = 'Project Name is required';
        if (!project.projectDescription) newError.projectDescription = 'Description is required';
        if (!project.projectImage) newError.projectImage = 'Project Image URL is required';
        if (!project.projectTeamSize) newError.projectTeamSize = 'Team Size is required';
        if (!project.projectLink) newError.projectLink = 'Project Link is required';
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            if (projectId) {
                await updateProject(projectId, project);
                setSuccessMessage('Project updated successfully!');
                setTimeout(() => navigate('/projects'), 2000);
            }
        } catch (error) {
            setErrorMessage('Error updating project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-project-form">
            <h3 className="text-center">Edit Project</h3>
            {loading && <div className="loader">Updating project...</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        value={project.projectName}
                        onChange={(e) => setProject({ ...project, projectName: e.target.value })}
                        className="form-control"
                        required
                    />
                    {error.projectName && <p className="error-text">{error.projectName}</p>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={project.projectDescription}
                        onChange={(e) => setProject({ ...project, projectDescription: e.target.value })}
                        className="form-control"
                        required
                    />
                    {error.projectDescription && <p className="error-text">{error.projectDescription}</p>}
                </div>

                <div className="form-group">
                    <label>Project Image URL</label>
                    <input
                        type="text"
                        value={project.projectImage}
                        onChange={(e) => setProject({ ...project, projectImage: e.target.value })}
                        className="form-control"
                        required
                    />
                    {error.projectImage && <p className="error-text">{error.projectImage}</p>}
                </div>

                <div className="form-group">
                    <label>Team Size</label>
                    <input
                        type="number"
                        min="1"
                        value={project.projectTeamSize}
                        onChange={(e) => setProject({ ...project, projectTeamSize: parseInt(e.target.value, 10) })}
                        className="form-control"
                        required
                    />
                    {error.projectTeamSize && <p className="error-text">{error.projectTeamSize}</p>}
                </div>

                <div className="form-group">
                    <label>Project Link</label>
                    <input
                        type="text"
                        value={project.projectLink}
                        onChange={(e) => setProject({ ...project, projectLink: e.target.value })}
                        className="form-control"
                        required
                    />
                    {error.projectLink && <p className="error-text">{error.projectLink}</p>}
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/projects')}>
                    Cancel
                </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <div className="notification">{successMessage}</div>}
        </div>
    );
};

export default EditProject;
