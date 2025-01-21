import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { sunveerResponseModel } from '../model/sunveerResponseModel';

export const getAllSunveer = async (): Promise<sunveerResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<sunveerResponseModel[]>(
    `${backendUrl}/api/v1/sunveer`
  );
  return response.data;
};
