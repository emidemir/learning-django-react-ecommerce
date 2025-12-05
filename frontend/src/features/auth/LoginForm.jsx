// ==========React imports==========
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==========REDUX imports==========
import { useDispatch } from 'react-redux';
import { loginUser } from './authSlice'; 

// ==========COMPONENTS imports==========
import PrimaryButton from '../../components/ui/PrimaryButton';

// ==========MUI imports==========
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// ==========GOOGLE OAUTH imports==========
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginForm = ({ handleGoogleAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // FIX: Pass the actual user data to Redux, not an empty object!
        dispatch(loginUser({
          user: data.user,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        }));
        navigate('/');
      } else {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      // This catches 'Failed to fetch' (Network Error)
      console.error("Login Error:", err);
      setError(err.message || "Network error: Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
        disabled={loading}
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
        disabled={loading}
        onChange={handleChange}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
        <Link href="#" variant="body2" underline="hover" sx={{ color: 'primary.main' }}>
          Forgot password?
        </Link>
      </Box>

      <PrimaryButton type="submit" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
      </PrimaryButton>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          <GoogleLogin onSuccess={handleGoogleAuth} />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
};

export default LoginForm;