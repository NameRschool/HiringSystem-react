import React, { ChangeEvent,useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createJob } from '../api/JobsApi';
import Inputs from './Form';

// interface IcandidatesInfo {
//   candidatesId: string;
//   rating: number;
//   cognitive: number;
//   personality: number;
//   reliability: number;
//   interview: boolean;
//   screeningCall: boolean;
//   task: boolean;
//   cv: string;
// }

// interface IjobType {
//   _id: string;
//   name: string;
//   status: boolean;
//   date: Date;
//   location: string;
//   jobDescription?: string;
//   companyDescription?: string;
//   requierments: string[];
//   candidatesList?: IcandidatesInfo[];
// }

const AddJob: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IjobType, '_id' | 'status' | 'date'>>({
    name: '',
    location: '',
    jobDescription: '',
    companyDescription:'',
    requierments: [],
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (formData: Omit<IjobType, '_id' | 'status' | 'date'>) => {
    try {
      const jobData: IjobType = {
        _id: uuidv4(),
        status: true,
        date: new Date(),
        ...formData,
      };
  
      createJob(jobData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Job</h1>
      <Inputs formData={formData} onChange={handleChange} handleSubmit={handleSubmit} />    </div>
  );
};

export default AddJob;
