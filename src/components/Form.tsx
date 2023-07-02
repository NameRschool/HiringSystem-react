import React, { ChangeEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface InputsProps<T> {
    formData: T;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (formData: T) => void;
}

const Inputs = <T extends Record<string, any>>({
    formData,
    onChange,
    handleSubmit,
}: InputsProps<T>) => {

    const handleClick = (event: any) => {
        event.preventDefault();
        handleSubmit(formData);
    };

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
                    value={value || ''}
                    onChange={onChange}
                />
            ))}
            <Button variant="contained" onClick={handleClick}>
                Submit
            </Button>
        </Box>
    );
};

export default Inputs;
