import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  
  Avatar,
  CssBaseline,
  GlobalStyles,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {useSelector, useDispatch} from 'react-redux'

import {GlassPaper, titleStyle, GlassAlert, glassInputStyle, gradientButtonStyle, avatarStyle} from '../ui/GlassStyle'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// ----------------------------------------------------------------------
// MAIN APP CONTROLLER (Manages which view is shown)
// ----------------------------------------------------------------------
export default function Auth() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'profile'
  const [user,setUser] = useState();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('profile');
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setCurrentView('profile');
  };
  
  const handleGoogleAuth = () => {
    
  }

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ body: { margin: 0, padding: 0, boxSizing: 'border-box' } }} />
      
      {/* SHARED ANIMATED BACKGROUND */}
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // Deep Blue/Purple Gradient
          background: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)',
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 100%, hsla(225,39%,30%,1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)
          `,
          backgroundSize: 'cover',
          p: 2,
        }}
      >
        {currentView === 'login' && (
          <LoginView 
            google_handler={handleGoogleAuth}
            onLogin={handleLoginSuccess} 
            switchToSignup={() => setCurrentView('signup')} 
          />
        )}
        {currentView === 'signup' && (
          <SignupView 
            google_handler={handleGoogleAuth}
            onSignup={handleSignupSuccess} 
            switchToLogin={() => setCurrentView('login')} 
          />
        )}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// SIGN UP VIEW
// ----------------------------------------------------------------------
const SignupView = ({ onSignup, switchToLogin, google_handler }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success
      onSignup({ 
        id: 99, 
        name: `${formData.firstName} ${formData.lastName}`, 
        email: formData.email 
      });

    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassPaper>
      <Avatar sx={avatarStyle}>
        <PersonAddOutlinedIcon fontSize="large" />
      </Avatar>

      <Typography component="h1" variant="h4" sx={titleStyle}>
        Create Account
      </Typography>

      {error && <GlassAlert severity="error">{error}</GlassAlert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Grid container spacing={2}>
            <TextField
              name="firstName"
              required fullWidth
              label="First Name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              sx={glassInputStyle}
            />
            <TextField
              name="lastName"
              required fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              sx={glassInputStyle}
            />
          <TextField
              name="email"
              required fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={glassInputStyle}
            />
          <TextField
              name="password"
              required fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={glassInputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          <TextField
              name="confirmPassword"
              required fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              sx={glassInputStyle}
            />
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={gradientButtonStyle}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign Up'}
        </Button>

        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin
                onSuccess={google_handler}
            />  
        </GoogleOAuthProvider>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
             Already have an account?{' '}
             <span 
               onClick={switchToLogin}
               style={{ 
                 color: '#fff', 
                 cursor: 'pointer', 
                 fontWeight: 'bold',
                 textDecoration: 'underline',
                 textUnderlineOffset: '4px'
               }}
             >
               Sign In
             </span>
          </Typography>
        </Box>
      </Box>
    </GlassPaper>
  );
};

// ----------------------------------------------------------------------
// LOGIN VIEW (Reused from previous, slightly refined)
// ----------------------------------------------------------------------
const LoginView = ({ onLogin, switchToSignup, google_handler }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
  };

  return (
    <GlassPaper>
      <Avatar sx={avatarStyle}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>

      <Typography component="h1" variant="h4" sx={titleStyle}>
        Welcome Back
      </Typography>

      {error && <GlassAlert severity="error">{error}</GlassAlert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal" required fullWidth
          label="Email Address" name="email"
          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          variant="outlined"
          sx={glassInputStyle}
        />
        <TextField
          margin="normal" required fullWidth
          label="Password" name="password" type="password"
          value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
          variant="outlined"
          sx={glassInputStyle}
        />
        <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={gradientButtonStyle}>
          {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In'}
        </Button>

        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin
                onSuccess={google_handler}
            />  
        </GoogleOAuthProvider>
      </Box>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Don't have an account?{' '}
            <span 
              onClick={switchToSignup}
              style={{ color: '#fff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}
            >
              Sign Up
            </span>
        </Typography>
      </Box>
    </GlassPaper>
  );
};