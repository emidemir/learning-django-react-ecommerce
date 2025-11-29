import {Paper, Alert} from '@mui/material'

export const GlassPaper = ({ children }) => (
  <Paper
    elevation={24}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: { xs: 3, sm: 6 },
      width: '100%',
      maxWidth: 500, // Slightly wider for signup
      borderRadius: 4,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    }}
  >
    {children}
  </Paper>
);

export const GlassAlert = ({ children, severity }) => (
  <Alert
    severity={severity}
    variant="filled"
    sx={{
      width: '100%', mb: 3, borderRadius: 2,
      backgroundColor: severity === 'error' ? 'rgba(211, 47, 47, 0.6)' : 'rgba(46, 125, 50, 0.6)',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff'
    }}
  >
    {children}
  </Alert>
);

export const glassInputStyle = {
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
  },
  '& .MuiInputBase-input': { color: '#fff' }, // Ensures text is white
};

export const gradientButtonStyle = {
  mt: 3, mb: 2, py: 1.5,
  borderRadius: 3,
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
  boxShadow: '0 4px 15px rgba(0, 210, 255, 0.4)',
  transition: 'transform 0.2s',
  '&:hover': {
    background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0, 210, 255, 0.6)',
  },
  '&.Mui-disabled': {
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.3)',
  }
};

export const avatarStyle = {
  m: 1,
  bgcolor: 'rgba(255,255,255,0.1)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
  width: 56,
  height: 56,
  boxShadow: '0 0 15px rgba(0,255,255,0.3)'
};

export const titleStyle = {
  mb: 1,
  fontWeight: 700,
  color: '#fff',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  textAlign: 'center',
  letterSpacing: '0.5px'
};