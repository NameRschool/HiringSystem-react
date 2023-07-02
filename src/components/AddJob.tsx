import React, { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createJob } from '../api/JobsApi';
import Inputs from './Form';

interface IjobType {
  name: string;
  location: string;
  jobDescription: string;
}

const AddJob: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IjobType, '_id'>>({
    name: '',
    location: '',
    jobDescription: '',
    requirements: '',
  });
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const jobData = {
        _id: uuidv4(),
        status: true,
        date: new Date(),
        ...formData,
      };
      const response = await createJob(jobData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Job</h1>
      <Inputs formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddJob;
