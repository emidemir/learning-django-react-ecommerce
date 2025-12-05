import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Imports
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductList from '../features/products/ProductList';
import PrimaryButton from '../components/ui/PrimaryButton';

const HeroSection = () => (
  <Box
    sx={{
      bgcolor: 'grey.900',
      color: 'white',
      py: { xs: 8, md: 12 },
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://via.placeholder.com/1200x600)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <Container maxWidth="lg">
      <Box maxWidth="sm">
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          Summer Collection 2024
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
          Discover the latest trends in fashion and electronics with up to 50% off.
        </Typography>
        <PrimaryButton size="large" sx={{ px: 4, py: 1.5 }}>
          Shop Now
        </PrimaryButton>
      </Box>
    </Container>
  </Box>
);

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <ProductList />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default HomePage;