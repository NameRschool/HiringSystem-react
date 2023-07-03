import React, { useEffect, useState } from 'react'
import { getJobs, updateJobById, deleteJobById, getCandidatesList } from '../api/JobsApi'
import { AxiosResponse } from 'axios';
import CustomDataGrid from './Tabel';


const JobItem: React.FC = () => {
  const [jobs, setJobs] = useState<IjobType[]>([]);
  const [selectedJobCandidates, setCandidatesList] = useState<IcandidatesInfo[]>([]);

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = (): void => {
    getJobs()
      .then((response: AxiosResponse<IjobType[], any>) => {
        console.log(response.data);
        const jobs = response.data.map((job, index) => ({
          ...job,
          id: index + 1,
        }));
        setJobs(jobs);
      })
      .catch((err: Error) => console.log(err));
  };

  const fetchCandidatesList = async (row: IjobType):Promise<void> => {
    try {
      const response = await getCandidatesList(row._id);
      setCandidatesList(response.data);
    } catch (error) {
      console.log(' error:', error);
    }
  };

  const deleteJob = async (row: IjobType) => {
    try {
      const response = await deleteJobById(row._id);
      console.log('Delete response:', response.data);
    } catch (error) {
      console.log('Delete error:', error);
    }
  };

  const UpdateJob = async (row: IjobType,updatedData: Partial<IjobType>) => {
    try {
      const response = await updateJobById(row._id, updatedData);
      console.log('Update success:', response.data);
    } catch (error) {
      console.log('Update error:', error);
    }
  };

  


  return (
    <div className="Card">
      <h1>My jobs</h1>
      <CustomDataGrid rows={jobs} list={fetchCandidatesList} deleteJob={deleteJob}  updateJob={UpdateJob}   hiddenColumns={['_id', 'id','candidatesList']} />
    </div>
  )
  }

export default JobItem
