import React, { useEffect, useState } from 'react'
import { getJobs, updateJobById, deleteJobById } from '../api/JobsApi'
import { AxiosResponse } from 'axios';
import CustomDataGrid from './Tabel';



const JobItem: React.FC = () => {
  const [jobs, setJobs] = useState<IjobType[]>([]);
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
  return (
    <div className="Card">
      <CustomDataGrid rows={jobs} />
    </div>
  )
}

export default JobItem
