import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

// Imports
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PrimaryButton from '../components/ui/PrimaryButton';
import OutlineButton from '../components/ui/OutlineButton';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

// --- Sub-component: Address Form ---
const AddressForm = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField required label="First name" fullWidth />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField required label="Last name" fullWidth />
    </Grid>
    <Grid item xs={12}>
      <TextField required label="Address line 1" fullWidth />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField required label="City" fullWidth />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField required label="Zip / Postal code" fullWidth />
    </Grid>
  </Grid>
);

// --- Sub-component: Payment Form ---
const PaymentForm = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField required label="Name on card" fullWidth />
    </Grid>
    <Grid item xs={12}>
      <TextField required label="Card number" fullWidth />
    </Grid>
    <Grid item xs={6}>
      <TextField required label="Expiry date" fullWidth />
    </Grid>
    <Grid item xs={6}>
      <TextField required label="CVV" helperText="Last three digits on signature strip" fullWidth />
    </Grid>
  </Grid>
);

// --- Sub-component: Review ---
const ReviewOrder = () => (
  <Box>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <Typography color="text.secondary" paragraph>
      Items: Wireless Headphones, Running Sneakers...
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>Total: $424.99</Typography>
  </Box>
);

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0: return <AddressForm />;
      case 1: return <PaymentForm />;
      case 2: return <ReviewOrder />;
      default: return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Navbar />
      
      <Container component="main" maxWidth="md" sx={{ mb: 4, flexGrow: 1, py: 6 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <React.Fragment>
            {activeStep === steps.length ? (
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation.
                </Typography>
              </Box>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  {activeStep !== 0 && (
                    <OutlineButton onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </OutlineButton>
                  )}
                  <PrimaryButton onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </PrimaryButton>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default CheckoutPage;