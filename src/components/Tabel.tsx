import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';

interface DataGridProps<T> {
    rows: T[];
    hiddenColumns?: string[];
    deleteAction: (row: T) => Promise<void>;
    updateAction: (row: T, updatedData: Partial<T>) => Promise<void>;
}

const CustomDataGrid = <T extends Record<string, any>>({
    rows,
    hiddenColumns = [],
    deleteAction,
    updateAction,
}: DataGridProps<T>) => {
    const [isEditMode, setIsEditMode] = React.useState(false);

    const handleDelete = async (row: T) => {
        try {
            await deleteAction(row);
            console.log('Delete success');
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const handleUpdate = async (row: T) => {
        try {
            setIsEditMode(true);
            //////////////////////////////
            await updateAction(row, row);
            setIsEditMode(false);
            console.log('Update success');
        } catch (error) {
            console.log('Update error:', error);
        }
    };


    const columns: GridColDef[] = React.useMemo(() => {
        if (rows.length === 0) return [];

        const rowKeys  = Object.keys(rows[0]);
        const generatedColumns: GridColDef[] = rowKeys 
            .filter((key) => !hiddenColumns.includes(key))
            .map((key) => ({
                field: key,
                headerName: key,
                width: 150,
                editable: isEditMode,
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
                <IconButton onClick={() => aaaa(params.row)}>
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

        generatedColumns.push(deleteColumn, updateColumns, showColumns);

        return generatedColumns;
    }, [rows, hiddenColumns]);





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
