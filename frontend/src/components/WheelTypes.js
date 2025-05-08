import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    FormHelperText
} from '@mui/material';

const WheelTypes = ({ formData, setFormData, onContinue }) => {
    const [error, setError] = useState(false);

    const handleWheelTypeChange = (e) => {
        const selected = e.target.value;
        setFormData(prev => ({ ...prev, wheels: selected }));
        setError(false); // clear error on selection
    };

    const handleContinue = () => {
        if (!formData.wheels) {
            setError(true);
        } else {
            onContinue(3);
        }
    };

    return (
        <div className="flex flex-col justify-center p-4">
            <div className="mb-6 text-xl font-bold">Looking for Bike or Car?</div>

            <FormControl component="fieldset" error={error}>
                {/* <FormLabel component="legend">Select Vehicle Type</FormLabel> */}
                <RadioGroup
                    size="small"
                    name="wheeltype"
                    value={formData.wheels}
                    onChange={handleWheelTypeChange}
                >
                    <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
                    <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
                </RadioGroup>
                {error && <FormHelperText>Please select a wheel type</FormHelperText>}
            </FormControl>

            <div className="mt-8">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleContinue}
                    className="mt-6">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default WheelTypes;
