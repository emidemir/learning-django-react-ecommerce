import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Use Grid2 if on MUI v6, standard Grid for v5
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#fff',
        borderTop: '1px solid #eaeaea',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              E-SHOP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The best products at the best prices. 
              Delivered straight to your doorstep.
            </Typography>
          </Grid>
          
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="text.secondary" underline="hover">Home</Link>
              <Link href="#" color="text.secondary" underline="hover">Products</Link>
              <Link href="#" color="text.secondary" underline="hover">Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="text.secondary" underline="hover">Privacy Policy</Link>
              <Link href="#" color="text.secondary" underline="hover">Terms of Service</Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={5} pt={3} borderTop="1px solid #eee" textAlign="center">
           <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} E-Shop Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;