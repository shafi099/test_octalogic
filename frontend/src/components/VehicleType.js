import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Skeleton
} from '@mui/material';
import { environment } from '../environment';

const VehicleType = ({ formData, setFormData, onContinue }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const type = formData.wheels == 2 ? 'bike' : 'car';
    setLoading(true);
    fetch(`${environment.basePath}/vehicles/type?category=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setTypes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [formData.wheels]);

  const handleContinue = () => {
    if (!formData.vehicleType) {
      setError(true);
    } else {
      setError(false);
      onContinue(4);
    }
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="mb-6 text-xl font-bold">Choose your vehicle type ..</div>

      {loading ? (
        <Skeleton variant="rectangular" height={56} className="mb-6 rounded-md" />
      ) : (
        <FormControl fullWidth error={error} size="small" className="mb-6">
          <InputLabel>Select Vehicle Type</InputLabel>
                      <Select
                          size="small"
            value={formData.vehicleType || ''}
            label="Select Vehicle Type"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vehicleType: e.target.value
              }))
            }
          >
            {types.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Please select a vehicle type</FormHelperText>}
        </FormControl>
      )}

          <div className="mt-8">
          <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        Next
      </Button>
      </div>
    </div>
  );
};

export default VehicleType;
