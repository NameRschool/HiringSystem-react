import axios, { AxiosResponse } from "axios"
import { v4 as uuidv4 } from 'uuid';

const baseUrl: string = "http://localhost:3002"

export const getCandidates = async (): Promise<AxiosResponse<IcandidatesType>> => {
    try {
        const response: AxiosResponse<IcandidatesType> = await axios.get(
            `${baseUrl}/api/candidates`
        );
        return response
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getCandidatesById = async (
    candidatesId: string
): Promise<AxiosResponse<IcandidatesType>> => {
    try {
        const response: AxiosResponse<IcandidatesType> = await axios.get(
            `${baseUrl}/api/jobs/${candidatesId}`
        );
        return response;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const createCandidates = async (
    formData: Omit<IcandidatesType, '_id'>
): Promise<AxiosResponse<string>> => {
    try {
        const candidatesData: IcandidatesType = {
            _id: uuidv4(),
            ...formData,
        };
        const response: AxiosResponse<string> = await axios.post(
            `${baseUrl}/api/jobs`,
            candidatesData
        );
        return response;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const UpdateCandidatById = async (
    candidatId: string,
    updatedData: Partial<IcandidatesInfo>
): Promise<AxiosResponse<string>> => {
    try {
        const response: AxiosResponse<string> = await axios.put(
            `${baseUrl}/api/jobs${candidatId}`,
            updatedData
        );
        return response
    } catch (error) {
        throw new Error(String(error))
    }
}

export const deleteCandidatById = async (
    candidatId: string
    ): Promise<AxiosResponse<String>> => {
    try {
        const response: AxiosResponse<string> = await axios.delete(
            `${baseUrl}/api/jobs/${candidatId}`
        );
        return response;
    } catch (error) {
        throw new Error(String(error));
    }
};