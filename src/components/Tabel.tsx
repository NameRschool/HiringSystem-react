import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import { getCandidatesList } from '../api/JobsApi';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

interface DataGridProps<T> {
    rows: T[];
    hiddenColumns?: string[];
    deleteJob: (row: T) => Promise<void>;
    list: (row: T) => Promise<void>;
    updateJob: (row: IjobType, updatedData: Partial<IjobType>) => void;
}

const CustomDataGrid: React.FC<DataGridProps<IjobType>> = ({ rows, deleteJob, updateJob,list, hiddenColumns = [] }) => {
    const [isEditMode, setIsEditMode] = React.useState(true);
    const [candidatesList, setCandidatesList] = React.useState<IcandidatesInfo[]>([]);

    const handleDelete = async (row: IjobType) => {
        try {
            await deleteJob(row);
            //console.log('Delete success');
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const handleUpdate = async (row: IjobType) => {
        try {
            setIsEditMode(true);
            //////////////////////////////
            await updateJob(row, row);
            setIsEditMode(false);
            console.log('update success');
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const fetchCandidatesList = async (row: IjobType):Promise<void> => {
        try {
            debugger
            const response = await getCandidatesList(row._id);
            setCandidatesList(response.data);
            console.log(response.data)
        } catch (error) {
            console.log('Failed to retrieve candidates list', error);
        }
    }

    const columns: GridColDef[] = React.useMemo(() => {
        if (rows.length === 0) return [];

        const jobKeys = Object.keys(rows[0]);
        const generatedColumns: GridColDef[] = jobKeys
            .filter((key) => !hiddenColumns.includes(key))
            .map((key) => ({
                field: key,
                headerName: key,
                width: 150,
                editable: false,
                renderHeader: (params) => <div>{params.colDef.headerName}</div>,
            }));

        const updateColumns: GridColDef = {
            field: 'update',
            headerName: 'update',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleUpdate(params.row)}>
                    <EditIcon />
                </IconButton>
            ),
        };

        const showColumns: GridColDef = {
            field: 'show',
            headerName: 'CandidatesList',
            width: 100,
            renderCell: (params) => (
              <IconButton onClick={() => fetchCandidatesList(params.row)}>
                <ListIcon />
              </IconButton>
            ),
          };
          
          

        const deleteColumn: GridColDef = {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row)}>
                    <GridDeleteIcon />
                </IconButton>
            ),
        };

        generatedColumns.push(deleteColumn, updateColumns,showColumns);

        return generatedColumns;
    }, [rows, hiddenColumns, isEditMode]);





    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default CustomDataGrid;
