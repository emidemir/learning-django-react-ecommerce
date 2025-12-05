import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login logic here:', formData);
  };

  const handleGoogleAuth = (credentials) => {
    console.log('Google response:', credentials);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
        <Link href="#" variant="body2" underline="hover" sx={{ color: 'primary.main' }}>
          Forgot password?
        </Link>
      </Box>

      <PrimaryButton type="submit" fullWidth>
        Sign In
      </PrimaryButton>

      {/* Added Box with margin-top (mt: 2) for the gap */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          <GoogleLogin onSuccess={handleGoogleAuth} />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
};

export default LoginForm;