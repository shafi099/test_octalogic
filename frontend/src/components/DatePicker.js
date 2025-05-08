import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateRangePicker = ({ formData, setFormData, onContinue }) => {
  const [startDate, setStartDate] = useState(formData.startDate || null);
  const [endDate, setEndDate] = useState(formData.endDate || null);
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (!startDate || !endDate) {
      setError(true);
    } else {
      setFormData(prev => ({ ...prev, startDate, endDate }));
      onContinue(6); // triggers final submit in App.js
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col justify-center p-4">
        <div className="mb-6 text-xl font-bold">Select your booking dates</div>

        <Stack spacing={3} className="mb-8">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              setError(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                error={error && !startDate}
                helperText={error && !startDate ? 'Required' : ''}
              />
            )}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              setError(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                error={error && !endDate}
                helperText={error && !endDate ? 'Required' : ''}
              />
            )}
          />
        </Stack>

        <Button variant="contained" color="primary" onClick={handleContinue} fullWidth>
          Next
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
