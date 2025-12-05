import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import our feature components
import LoginForm from '../features/auth/LoginForm';
import RegisterForm from '../features/auth/RegisterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleGoogleAuth = (credentials) => {
    console.log('Google response:', credentials);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container component="main" maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            padding: 4, 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' 
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
             {tabIndex === 0 ? 'Welcome Back' : 'Join Us'}
          </Typography>

          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs 
              value={tabIndex} 
              onChange={handleTabChange} 
              variant="fullWidth" 
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>

          {/* Render Login or Register based on Tab Index */}
          <Box sx={{ width: '100%' }}>
            {tabIndex === 0 && <LoginForm handleGoogleAuth={handleGoogleAuth} />}
            {tabIndex === 1 && <RegisterForm handleGoogleAuth={handleGoogleAuth} />}
          </Box>
          
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default AuthPage;