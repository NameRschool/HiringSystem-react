import React, { ChangeEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface InputsProps<T> {
    formData: T;
    requiredFields?: (keyof T)[];
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (formData: T) => void;
}

const Inputs = <T extends Record<string, any>>({
    formData,
    requiredFields = [],
    handleChange,
    handleSubmit,
}: InputsProps<T>) => {

    const handleClick = (event: any) => {
        event.preventDefault();
        handleSubmit(formData);
    };
    // const handleRefresh = () => {
    //     window.location.reload();
    // };
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {Object.entries(formData).map(([key, value]) => (
                <TextField
                    key={key}
                    id={key}
                    name={key}
                    label={key}
                    variant="filled"
                    onChange={handleChange}
                    required={requiredFields.includes(key as keyof T)}
                   
                />
            ))}
            <Button variant="contained" onClick={handleClick}>
                Submit
            </Button>
        </Box>
    );
};

export default Inputs;
