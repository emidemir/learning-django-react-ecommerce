import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Brand Color
      dark: '#115293',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0', // Accent Color
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8', // Light grey background for the app
      paper: '#ffffff',
    },
    text: {
      primary: '#2b3445',
      secondary: '#7d879c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Remove uppercase standard from MUI buttons
      fontWeight: 600,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Soft rounded corners
        },
      },
    },
  },
});

export default theme;