import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:3002"

export const getJobs = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const jobs: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/api/jobs"
    )
    return jobs
  } catch (error) {
    throw new Error(String(error))
  }
}

export const addJob = async (
  formData: IjobType
): Promise<AxiosResponse<ApiDataType>> => {
  try {
      const job: Omit<IjobType, "_id"> = {
      name: formData.name,
      location: formData.location,
      jobDescription: formData.jobDescription,
      companyDescription: formData.companyDescription,
      requierments: formData.requierments,
      candidatesList: formData.candidatesList,
    }
    const saveJob: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/api/jobs",
      job
    )
    return saveJob
  } catch (error) {
    throw new Error(String(error))
  }
}

