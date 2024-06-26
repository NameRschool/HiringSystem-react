import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon, GridCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';

interface DataGridProps<T> {
    rows: T[];
    hiddenColumns?: string[];
    deleteAction: (row: T) => Promise<void>;
    updateAction: (row: T, updatedData: Partial<T>) => Promise<void>;
    page: string;

}

const CustomDataGrid = <T extends Record<string, any>>({
    rows,
    hiddenColumns = [],
    deleteAction,
    updateAction,
    page,
}: DataGridProps<T>) => {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [tableKey, setTableKey] = React.useState(0);
    const navigate = useNavigate()

    const handleDelete = async (row: T) => {
        try {
            await deleteAction(row);
            console.log('Delete success');
        } catch (error) {
            console.log('Delete error:', error);
        }
    };

    const handleEdit = async (row: T) => {
        await setIsEditMode(true);
    };

    const handleUpdate = async (row: T) => {
        try {
            const updatedData = { ...row };
            await updateAction(row, updatedData);
            console.log('Update success');
        } catch (error) {
            console.log('Update error:', error);
        } finally {
            setIsEditMode(false);
            setTableKey((prevKey) => prevKey + 1);
        }
    };

    const showColumns = <T extends Record<string, any>>({ page }: { page: string }) => {
        const handleClick = (params: GridCellParams) => {
            navigate(page, { state: { rowData: params.row } });
        };

        return {
            field: 'show',
            headerName: 'details',
            width: 100,
            renderCell: (params: GridCellParams) => (
                <IconButton onClick={() => handleClick(params)}>
                    <ListIcon />
                </IconButton>
            ),
        };
    };

    const columns: GridColDef[] = React.useMemo(() => {
        if (rows.length === 0) return [];

        const rowKeys = Object.keys(rows[0]);
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
                <IconButton onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
            ),
        };

        const handleSubmit: GridColDef = {
            field: 'Submit',
            headerName: 'Submit',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleUpdate(params.row)}>
                    <SaveIcon />
                </IconButton>
            ),
        };
        const deleteColumn: GridColDef = {
            field: 'delete',
            headerName: 'delete',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row)}>
                    <GridDeleteIcon />
                </IconButton>
            ),
        };

        generatedColumns.push(deleteColumn, updateColumns, handleSubmit, showColumns<T>({ page: page }));

        return generatedColumns;
    }, [rows, hiddenColumns, isEditMode, handleUpdate, handleDelete, navigate, page]);




    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                key={tableKey}
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

            />
        </Box>
    );
};

export default CustomDataGrid;
