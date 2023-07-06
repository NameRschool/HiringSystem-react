import React, { useEffect, useState } from 'react'
import { getCandidatesList } from '../api/JobsApi'
import CustomDataGrid from './Tabel';
import { UpdateCandidatById, deleteCandidatById } from '../api/CandidatesApi';


const CandidatesList: React.FC = () => {
  const [selectedJobCandidates, setCandidatesList] = useState<IcandidatesInfo[]>([]);

  // useEffect(() => {
  //   fetchCandidatesList(row)
  // }, [])



  const fetchCandidatesList = async (row: IjobType): Promise<void> => {
    try {
      const response = await getCandidatesList(row._id);
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
      <CustomDataGrid rows={selectedJobCandidates}  deleteAction={deleteCandidates} updateAction={UpdateCandidates} hiddenColumns={['candidatesId', 'id']} />
    </div>
  )
}

export default CandidatesList
