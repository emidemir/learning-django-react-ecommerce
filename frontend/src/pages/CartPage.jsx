import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // or Grid2 in MUI v6
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

// Imports
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartItem from '../features/cart/CartItem';
import PrimaryButton from '../components/ui/PrimaryButton';

const MOCK_CART_ITEMS = [
  { id: 1, title: 'Wireless Headphones', price: 299.99, quantity: 1, size: 'One Size', color: 'Black', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Running Sneakers', price: 110.00, quantity: 2, size: '42', color: 'White', image: 'https://via.placeholder.com/150' },
];

const CartPage = () => {
  const subtotal = MOCK_CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Shopping Cart ({MOCK_CART_ITEMS.length} items)
        </Typography>

        <Grid container spacing={4}>
          {/* Left Column: Cart Items */}
          <Grid item xs={12} md={8}>
            {MOCK_CART_ITEMS.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>

          {/* Right Column: Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="500">${subtotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping Estimate</Typography>
                <Typography fontWeight="500">${shipping.toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">${total.toFixed(2)}</Typography>
              </Box>

              <PrimaryButton fullWidth size="large">
                Proceed to Checkout
              </PrimaryButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default CartPage;