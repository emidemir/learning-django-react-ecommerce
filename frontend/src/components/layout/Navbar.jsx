// ==========React imports==========
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==========REDUX imports==========
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice'; 

// ==========COMPONENTS imports==========
import GhostButton from '../ui/GhostButton'; 


// ==========MUI imports==========
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Install @mui/icons-material

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // 1. State for the Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // 2. Open the menu when button is clicked
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 3. Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 4. Handle Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    navigate('/auth');
  };

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
            {!user ? 
              <GhostButton>Login</GhostButton>
            : 
            <>
              {/* The Trigger Button */}
              <GhostButton 
                onClick={handleMenuOpen}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                Hi, {user.username || 'User'} ▼
              </GhostButton>

              {/* The Dropdown Menu */}
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                // Optional: styling to make it pop slightly below
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  Logout
                </MenuItem>
              </Menu>
            </>}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;