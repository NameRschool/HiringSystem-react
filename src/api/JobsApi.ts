import axios, { AxiosResponse } from "axios"
import { v4 as uuidv4 } from 'uuid';

const baseUrl: string = "http://localhost:3002"

export const getJobs = async (): Promise<AxiosResponse<IjobType>> => {
  try {
    const response: AxiosResponse<IjobType> = await axios.get(
      `${baseUrl}/api/jobs`
    );
    return response
  } catch (error) {
    throw new Error(String(error))
  }
}

export const getJobById = async (jobId: string): Promise<AxiosResponse<IjobType>> => {
  try {
    const response: AxiosResponse<IjobType> = await axios.get(
      `${baseUrl}/api/jobs/${jobId}`
    );
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createJob = async (
  formData: Omit<IjobType, '_id' | 'status' | 'date'>
): Promise<AxiosResponse<string>> => {
  try {
    const jobData: IjobType = {
      _id: uuidv4(),
      status: true,
      date: new Date(),
      ...formData,
    };
    const response: AxiosResponse<string> = await axios.post(
      `${baseUrl}/api/jobs`,
      jobData
    );
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const UpdateJobbyId = async (
  jobId: string,
  updatedData: Partial<IjobType>
  ): Promise<AxiosResponse<string>> => {
  try {
    const response: AxiosResponse<string> = await axios.put(
      `${baseUrl}/api/jobs${jobId}`,
      updatedData
    );
    return response
  } catch (error) {
    throw new Error(String(error))
  }
}

export const deleteJobById = async (jobId: string): Promise<AxiosResponse<String>> => {
  try {
    const response: AxiosResponse<string> = await axios.delete(
      `${baseUrl}/api/jobs/${jobId}`
    );
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};