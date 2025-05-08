import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const UserDetails = ({ formData, setFormData, onContinue }) => {
    const [errors, setErrors] = useState({ firstName: false, lastName: false });

    const transformName = (val) => {
        return val.target.value
            .replace(/[^a-zA-Z. ]/g, '') // Remove numbers & special characters
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters
    };

    const handleContinue = () => {
        const firstNameError = !formData.firstName?.trim();
        const lastNameError = !formData.lastName?.trim();

        if (firstNameError || lastNameError) {
            setErrors({ firstName: firstNameError, lastName: lastNameError });
            return;
        }

        setErrors({ firstName: false, lastName: false });
        onContinue(2);
    };

    return (
        <div className="flex flex-col justify-center p-4">
            <div className="mb-6 text-xl font-bold">What's your name?</div>

            <div className="mb-4">
                <TextField label="First Name" variant="outlined"
                    value={formData.firstName}
                    onChange={(val) => setFormData(prev => ({ ...prev, firstName: transformName(val)}))}
                    fullWidth
                    size="small"
                    error={errors.firstName}
                    helperText={errors.firstName ? "First name is required." : ""}
                    className="mb-4"
                />
            </div>

            <div className="mb-8">
                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={(val) => setFormData(prev => ({ ...prev, lastName: transformName(val) })) }
                    fullWidth
                    size="small"
                    error={errors.lastName}
                    helperText={errors.lastName ? "Last name is required." : ""}
                    className="mb-4"
                />
            </div>


            <Button
                variant="contained"
                color="primary"
                onClick={handleContinue}
                fullWidth>
                Next
            </Button>
        </div>
    );
};

export default UserDetails;
