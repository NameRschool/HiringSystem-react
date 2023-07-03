import React, { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createJob } from '../api/JobsApi';
import Inputs from '../components/Form';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton } from '@mui/material';

const AddJob: React.FC = () => {
    const navigate = useNavigate()

    const initialFormData: Omit<IjobType, '_id' | 'status' | 'date'> = {
        name: '',
        location: '',
        jobDescription: '',
        companyDescription: '',
        requierments: [],
    };

    const [formData, setFormData] = useState<Omit<IjobType, '_id' | 'status' | 'date'>>(initialFormData);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === 'requierments' ? value.split(',').map((item) => item.trim()) : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: updatedValue,
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
                    setFormData(initialFormData)

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
            <Inputs
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                requiredFields={['name', 'location', 'requierments']}
            />
            
            <IconButton onClick={() => navigate('/itemJob')}>
                <ArrowForwardIcon />
            </IconButton>
        </div>

    );
};

export default AddJob;
