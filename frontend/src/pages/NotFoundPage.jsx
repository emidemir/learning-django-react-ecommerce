import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

// Imports
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PrimaryButton from '../components/ui/PrimaryButton';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          py: 8
        }}
      >
        <Typography 
          variant="h1" 
          color="primary" 
          sx={{ fontWeight: 900, fontSize: { xs: '6rem', md: '10rem' } }}
        >
          404
        </Typography>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '500px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>

        <PrimaryButton size="large" onClick={() => navigate('/')}>
          Back to Home
        </PrimaryButton>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default NotFoundPage;