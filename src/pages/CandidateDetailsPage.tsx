import React, { useEffect, useState } from 'react'
import { getCandidatesById } from '../api/CandidatesApi';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import KeepMountedModal from '../components/Modal';



const CandidateDetails: React.FC = () => {
    const [selectedCandidateDetails, setSelectedCandidateDetails] = useState<IcandidatesType>();
    const [title, setTitle] = useState<string>('');
    const location = useLocation();
    const rowData = location.state?.rowData;
    const navigate = useNavigate()
    useEffect(() => {
        if (rowData) {
            fetchCandidateDetails(rowData)
        }
    }, [rowData])

    const fetchCandidateDetails = async (row: IcandidatesInfo): Promise<void> => {
        try {
            const response = await getCandidatesById(row.candidatesId);
            setSelectedCandidateDetails(response.data);
            setTitle(`${response.data.name} - Candidate Details `)
            console.log(response.data)
        } catch (error) {
            console.log('Failed to retrieve candidates list', error);
        }
    }

    return (
        <div className="Card">
            
            <KeepMountedModal openOnInit={true} title={title} description={selectedCandidateDetails} />
            <IconButton onClick={() => navigate('/candidatesPage')}>
                <ArrowForwardIcon />
            </IconButton>
        </div>
    )
}

export default CandidateDetails
