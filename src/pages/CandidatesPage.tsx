import React, { useEffect, useState } from 'react'
import { getCandidatesList } from '../api/JobsApi'
import CustomDataGrid from '../components/Tabel';
import { UpdateCandidatById, deleteCandidatById, getCandidatesById } from '../api/CandidatesApi';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CandidatesList: React.FC = () => {
    const [selectedJobCandidates, setCandidatesList] = useState<IcandidatesInfo[]>([]);
    const location = useLocation();
    const rowData = location.state?.rowData;
    const navigate = useNavigate()
    useEffect(() => {
        if (rowData) {
            fetchCandidatesList(rowData)
        }
    }, [rowData])



    const fetchCandidatesList = async (row: IjobType): Promise<void> => {
        try {
            const response = await getCandidatesList(row._id);
            console.log(response.data)
            const candidates = response.data.map((selectedJobCandidates, index) => ({
                ...selectedJobCandidates,
                id: index + 1,
            }));
            setCandidatesList(candidates);
            console.log(response.data)
        } catch (error) {
            console.log('Failed to retrieve candidates list', error);
        }
    }

    const deleteCandidates = async (row: IcandidatesInfo) => {
        try {
            const response = await deleteCandidatById(row.candidatesId);
            console.log('Delete response:', response.data);
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const UpdateCandidates = async (row: IcandidatesInfo, updatedData: Partial<IcandidatesInfo>) => {
        try {
            const response = await UpdateCandidatById(row.candidatesId, updatedData);
            console.log('Update success:', response.data);
        } catch (error) {
            console.log('Update error:', error);
        }
    };



    return (
        <div className="Card">
            <h1>CandidatesList</h1>
            <CustomDataGrid rows={selectedJobCandidates} deleteAction={deleteCandidates} updateAction={UpdateCandidates} hiddenColumns={['candidatesId', 'id', '_id', '__v']} page={'/candidateDetails'} />
            <IconButton onClick={() => navigate('/itemJob')}>
                <ArrowForwardIcon />
            </IconButton>
        </div>
    )
}

export default CandidatesList
