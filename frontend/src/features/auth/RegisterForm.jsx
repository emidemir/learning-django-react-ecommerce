import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PrimaryButton from '../../components/ui/PrimaryButton';
// Added missing imports for Google Auth
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register logic here:', formData);
  };

  // Added handler
  const handleGoogleAuth = (credentials) => {
    console.log('Google response:', credentials);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="Full Name"
        name="fullName"
        autoFocus
        value={formData.fullName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
       <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <Box sx={{ mt: 3 }}>
        <PrimaryButton type="submit" fullWidth>
          Create Account
        </PrimaryButton>
      </Box>

      {/* Added Google Button with gap */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          <GoogleLogin onSuccess={handleGoogleAuth} />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;