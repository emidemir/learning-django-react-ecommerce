import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';

// Feature Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderHistoryTable from '../features/orders/OrderHistoryTable';
import ProfileSettings from '../features/profile/ProfileSettings';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'settings'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
          My Account
        </Typography>

        <Grid container spacing={4}>
          
          {/* Left Sidebar: Navigation */}
          <Grid item xs={12} md={3}>
            <Paper elevation={0} variant="outlined" sx={{ overflow: 'hidden' }}>
              <List component="nav" disablePadding>
                
                <ListItemButton 
                  selected={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                  sx={{ borderLeft: activeTab === 'orders' ? '4px solid #1976d2' : '4px solid transparent' }}
                >
                  <ListItemIcon>
                    <ShoppingBagIcon color={activeTab === 'orders' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" primaryTypographyProps={{ fontWeight: activeTab === 'orders' ? 'bold' : 'medium' }} />
                </ListItemButton>

                <ListItemButton 
                  selected={activeTab === 'settings'}
                  onClick={() => setActiveTab('settings')}
                  sx={{ borderLeft: activeTab === 'settings' ? '4px solid #1976d2' : '4px solid transparent' }}
                >
                  <ListItemIcon>
                    <PersonIcon color={activeTab === 'settings' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" primaryTypographyProps={{ fontWeight: activeTab === 'settings' ? 'bold' : 'medium' }} />
                </ListItemButton>

                <ListItemButton sx={{ color: 'error.main' }}>
                  <ListItemIcon>
                    <LogoutIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>

              </List>
            </Paper>
          </Grid>

          {/* Right Content Area */}
          <Grid item xs={12} md={9}>
            <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
              {activeTab === 'orders' && (
                <>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Order History
                  </Typography>
                  <OrderHistoryTable />
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Personal Information
                  </Typography>
                  <ProfileSettings />
                </>
              )}
            </Paper>
          </Grid>

        </Grid>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default ProfilePage;