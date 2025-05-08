import React, { useEffect, useState } from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Skeleton,
  FormHelperText
} from '@mui/material';
import { environment } from '../environment';

const Vehicles = ({ formData, setFormData, onContinue }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formData?.vehicleType) {
      setLoading(true);
      fetch(`${environment.basePath}/vehicles?vehicleTypeId=${formData?.vehicleType}`)
        .then(res => res.json())
        .then(data => {
          setVehicles(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [formData?.vehicleType]);

  const handleVehicleChange = (e) => {
    setFormData(prev => ({ ...prev, vehicleId: e.target.value }));
    setError(false);
  };

  const handleContinue = () => {
    if (!formData.vehicleId) {
      setError(true);
    } else {
      onContinue(5);
    }
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="mb-6 text-xl font-bold">Choose your vehicle</div>

      {loading ? (
        <>
          <Skeleton variant="text" height={30} width="50%" className="mb-4" />
          <Skeleton variant="rectangular" height={120} className="mb-6 rounded-md" />
        </>
      ) : vehicles.length > 0 ? (
        <FormControl component="fieldset" error={error} className="mb-6">
          {/* <FormLabel>Select Vehicle</FormLabel> */}
          <RadioGroup
            value={formData.vehicleId || ''}
            onChange={handleVehicleChange}
          >
            {vehicles.map(vehicle => (
              <FormControlLabel
                key={vehicle.id}
                value={vehicle.id}
                control={<Radio />}
                label={vehicle.name}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>Please select a vehicle</FormHelperText>}
        </FormControl>
      ) : (
        <p>No vehicles available for the selected type</p>
      )}

          <div className="mt-8">
          <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleContinue}
        disabled={loading || vehicles.length === 0}
      >
        Next
      </Button>
      </div>
    </div>
  );
};

export default Vehicles;
