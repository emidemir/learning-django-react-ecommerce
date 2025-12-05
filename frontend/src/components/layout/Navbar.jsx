import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Install @mui/icons-material
import GhostButton from '../ui/GhostButton'; 

const Navbar = () => {
  return (
    <AppBar position="sticky" color="inherit" sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Logo Area */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '.1rem',
              fontSize: '1.5rem',
            }}
          >
            E-SHOP
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
            <GhostButton>Products</GhostButton>
            <GhostButton>Categories</GhostButton>
            <GhostButton>About</GhostButton>
          </Box>

          {/* User Actions */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton aria-label="cart">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <GhostButton>Login</GhostButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;