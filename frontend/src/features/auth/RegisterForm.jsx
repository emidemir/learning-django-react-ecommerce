// ==========React imports==========
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==========REDUX imports==========
import { useDispatch } from 'react-redux';
import { loginUser } from './authSlice'; 

// ==========MUI imports==========
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'; // <--- NEW
import CircularProgress from '@mui/material/CircularProgress'; // <--- NEW

// ==========COMPONENTS imports==========
import PrimaryButton from '../../components/ui/PrimaryButton';

// ==========GOOGLE OAUTH imports==========
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const RegisterForm = ({ handleGoogleAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword){
      setError("Passwords don't match!");
      // We clear the password fields for UX safety, but keep the name/email
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
      return;
    }

    try {
      setLoading(true); // Start loading

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginUser({
          user: data.user,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        }));
        navigate('/');
      } else {
        // Handle API errors (e.g. "User already exists")
        throw new Error(data.message || "Sign up failed. Please try again.");
      }
    } catch (err) {
      // Handle Network errors (e.g. Server down)
      console.error("Signup Error:", err);
      setError(err.message || "Network error: Unable to reach the server.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      
      {/* 2. Error Message Area */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
        disabled={loading} // Disable while loading
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
        disabled={loading}
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
        disabled={loading}
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
        disabled={loading}
      />

      <Box sx={{ mt: 3 }}>
        <PrimaryButton type="submit" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
        </PrimaryButton>
      </Box>

      {/* Google Button */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          <GoogleLogin onSuccess={handleGoogleAuth} />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;