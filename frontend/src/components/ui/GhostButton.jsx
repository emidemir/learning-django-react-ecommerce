import React from 'react';
import Button from '@mui/material/Button';

const GhostButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      variant="text"
      color="inherit" // Uses text color
      onClick={onClick}
      sx={{
        color: 'text.secondary',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          color: 'text.primary',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GhostButton;