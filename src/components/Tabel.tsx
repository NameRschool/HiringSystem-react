import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


interface DataGridProps<T> {
    rows: T[];
}



const CustomDataGrid: React.FC<DataGridProps<IjobType>> = ({ rows }) => {
    const columns: GridColDef[] = React.useMemo(() => {
        if (rows.length === 0) return []; // Return empty columns if there are no rows

        const jobKeys = Object.keys(rows[0]); // Get the keys of the first job object
        const generatedColumns: GridColDef[] = jobKeys.map((key) => ({
            field: key,
            headerName: key,
            width: 150,
            editable: true,
        }));

        return generatedColumns;
    }, [rows]);
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
