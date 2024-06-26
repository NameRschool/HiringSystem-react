import React, { useEffect, useState } from 'react'
import { getJobs, updateJobById, deleteJobById } from '../api/JobsApi'
import { AxiosResponse } from 'axios';
import CustomDataGrid from '../components/Tabel';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const JobItem: React.FC = () => {
    const [jobs, setJobs] = useState<IjobType[]>([]);
    const navigate = useNavigate()

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

    const deleteJob = async (row: IjobType) => {
        try {
            const response = await deleteJobById(row._id);
            console.log('Delete response:', response.data);
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const UpdateJob = async (row: IjobType, updatedData: Partial<IjobType>) => {
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
            <IconButton onClick={() => navigate('/addJob')}>
                <AddIcon />
            </IconButton>
            <CustomDataGrid rows={jobs} deleteAction={deleteJob} updateAction={UpdateJob} hiddenColumns={['_id', 'id', 'candidatesList']} page={ '/candidatesPage' }/>
        </div>
    )
}

export default JobItem
