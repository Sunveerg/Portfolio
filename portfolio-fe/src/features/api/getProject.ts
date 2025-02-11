import axiosInstance from '../../Shared/Api/axiosInstance';
import {projectResponseModel} from '../model/projectResponseModel';
import {projectRequestModel} from "../model/projectRequestModel";
import {AxiosResponse} from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllProjects = async (): Promise<projectResponseModel[]> => {

    const response = await axiosInstance.get<projectResponseModel[]>(
        `${backendUrl}/api/v1/projects`
    );
    return response.data;
};

export const getProjectById = async (
    projectId: string
): Promise<projectResponseModel> => {
    const response = await axiosInstance.get<projectResponseModel>(
        `${backendUrl}/api/v1/projects/${projectId}`
    );
    return response.data;
}

export const addProject = async (
    project: projectRequestModel
): Promise<AxiosResponse<void>> => {
    return await axiosInstance.post<void>(
        `${backendUrl}/api/v1/projects`,
        project
    );
}

export const updateProject = async (
    projectId: string,
    project: projectRequestModel
): Promise<void> => {
        await axiosInstance.put<void>(
            `${backendUrl}/api/v1/projects/${projectId}`, project
        );
}

export const deleteProject = async (
    projectId: string
): Promise<void> => {
    await axiosInstance.delete<void>(
        `${backendUrl}/api/v1/projects/${projectId}`
    );
}
