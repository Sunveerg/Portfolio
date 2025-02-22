import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { sunveerResponseModel } from '../model/sunveerResponseModel';
import {sunveerRequestModel} from "@/features/model/sunveerRequestModel";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllSunveer = async (): Promise<sunveerResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const response = await axiosInstance.get<sunveerResponseModel[]>(
    `${backendUrl}/api/v1/sunveer`
  );
  console.log('Sunveer data:', response.data);
  return response.data;
};

export const updateSunveer = async (
    sunveerId: string,
    sunveer: sunveerRequestModel
): Promise<void> => {
  await axiosInstance.put<void>(
      `${backendUrl}/api/v1/sunveer/${sunveerId}`, sunveer
  );
}