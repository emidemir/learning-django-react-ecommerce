import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// Imports
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PrimaryButton from '../components/ui/PrimaryButton';
import OutlineButton from '../components/ui/OutlineButton';
import ReviewSection from '../features/reviews/ReviewSection';

const ProductDetailsPage = () => {
  // Mock Product Data
  const product = {
    title: "Wireless Noise Canceling Headphones",
    price: 299.99,
    description: "Experience world-class silence with our new noise-canceling technology. Perfect for travel, work, or just relaxing.",
    rating: 4.5,
    reviews: 120,
    category: "Electronics",
    inStock: true,
    image: "https://via.placeholder.com/600x400"
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        
        {/* Top Section: Product Info */}
        <Grid container spacing={6}>
          {/* Left: Image */}
          <Grid>
            <Box 
              component="img"
              src={product.image}
              alt={product.title}
              sx={{ 
                width: '100%', 
                borderRadius: 2, 
                boxShadow: 3,
                objectFit: 'cover'
              }}
            />
          </Grid>

          {/* Right: Details */}
          <Grid>
            <Box>
              <Chip label={product.category} color="primary" variant="outlined" size="small" sx={{ mb: 2 }} />
              
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviews} reviews)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary.main" fontWeight="bold" sx={{ mb: 3 }}>
                ${product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <PrimaryButton size="large" fullWidth>
                  Add to Cart
                </PrimaryButton>
                <OutlineButton size="large">
                  Wishlist
                </OutlineButton>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Free shipping on all orders over $50. <br />
                30-day money-back guarantee.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* Bottom Section: Reviews */}
        <ReviewSection />

      </Container>
      
      <Footer />
    </Box>
  );
};

export default ProductDetailsPage;