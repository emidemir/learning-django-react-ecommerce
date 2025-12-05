import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductCard from './ProductCard';

// Temporary Mock Data
const MOCK_PRODUCTS = [
  { id: 1, title: 'Wireless Noise Canceling Headphones', category: 'Electronics', price: 299.99, rating: 4.5, reviewCount: 120, image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Ergonomic Office Chair', category: 'Furniture', price: 159.00, rating: 4.0, reviewCount: 85, image: 'https://via.placeholder.com/300' },
  { id: 3, title: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 89.99, rating: 4.8, reviewCount: 230, image: 'https://via.placeholder.com/300' },
  { id: 4, title: 'Stainless Steel Water Bottle', category: 'Home', price: 24.50, rating: 4.2, reviewCount: 45, image: 'https://via.placeholder.com/300' },
  { id: 5, title: 'Running Sneakers', category: 'Apparel', price: 110.00, rating: 4.6, reviewCount: 90, image: 'https://via.placeholder.com/300' },
  { id: 6, title: 'Smart Watch Series 5', category: 'Electronics', price: 349.00, rating: 4.7, reviewCount: 310, image: 'https://via.placeholder.com/300' },
];

const ProductList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Featured Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Handpicked selection just for you
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {MOCK_PRODUCTS.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;