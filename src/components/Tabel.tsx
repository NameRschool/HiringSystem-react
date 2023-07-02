import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';



interface DataGridProps<T> {
    rows: T[];
    hiddenColumns?: string[];
    deleteJob: (row: T) => Promise<void>;
}

const CustomDataGrid: React.FC<DataGridProps<IjobType>> = ({ rows, deleteJob , hiddenColumns = []}) => {

    const columns: GridColDef[] = React.useMemo(() => {
        const handleDelete = async (row: IjobType) => {
            try {
              await deleteJob(row);
              console.log('Delete success');
            } catch (error) {
              console.log('Delete error:', error);
            }
          };

          const handleUpdate = (row: IjobType) => {
            // Handle update logic here
            console.log('Update row:', row);
        };

        if (rows.length === 0) return [];
        const jobKeys = Object.keys(rows[0]);
        const generatedColumns: GridColDef[] = jobKeys.map((key) => ({
            field: key,
            headerName: key,
            width: 150,
            editable: false,
            hide: hiddenColumns.includes(key),
        }));

       const updateColumns: GridColDef ={
            field: 'update',
            headerName: 'update',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleUpdate(params.row)}>
                <EditIcon />
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
      
          generatedColumns.push(deleteColumn,updateColumns);

        return generatedColumns;
    }, [rows, hiddenColumns,deleteJob]);



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
