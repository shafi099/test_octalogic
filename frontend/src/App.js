import './App.css';
import { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import UserDetails from './components/UserDetails';
import WheelTypes from './components/WheelTypes';
import VehicleType from './components/VehicleType';
import Vehicles from './components/Vehicles';
import DateRangePicker from './components/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { environment } from './environment';
import BookingsList from './components/ListBookings';

const theme = createTheme({
  typography: {
    fontFamily: '"Sofia Sans", sans-serif',
  },
});

const steps = ['User Details', 'Wheel Type', 'Vehicle Type', 'Vehicle', 'Booking Dates'];

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleId: '',
    startDate: null,
    endDate: null,
  });

  const handleContinue = async (nextStep) => {
    if (nextStep > steps.length) {
      // Submit form to backend
      try {
        const response = await fetch(`${environment.basePath}/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log('Form submitted:', result);
        alert('Booking Successful!');
        window.location.reload();
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Submission failed');
      }
    } else {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 1:
        return <UserDetails formData={formData} setFormData={setFormData} onContinue={handleContinue} />;
      case 2:
        return <WheelTypes formData={formData} setFormData={setFormData} onContinue={handleContinue} />;
      case 3:
        return <VehicleType formData={formData} setFormData={setFormData} onContinue={handleContinue} />;
      case 4:
        return <Vehicles formData={formData} setFormData={setFormData} onContinue={handleContinue} />;
      case 5:
        return <DateRangePicker formData={formData} setFormData={setFormData} onContinue={handleContinue} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="h-[100vh] w-full flex flex-row justify-evenly items-center bg-gray-50 sofia-sans">
        <Paper elevation={3} className="lg:p-12 p-6 lg:w-[48vw]">
          <Stepper activeStep={step - 1} alternativeLabel className="mb-12">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box className="flex justify-between mt-4">
            {step !== 1 && <Button color="primary" onClick={handleBack} disabled={step === 1} >
              Back
            </Button>}
          </Box>
          {getStepContent(step)}
        </Paper>

        <Paper elevation={3} className="lg:w-[48vw]">
          <BookingsList></BookingsList>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
