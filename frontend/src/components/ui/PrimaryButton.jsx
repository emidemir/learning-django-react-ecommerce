import React from 'react';
import Button from '@mui/material/Button';

const PrimaryButton = ({ children, onClick, fullWidth, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
        padding: '10px 24px',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(25, 118, 210, 0.23)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;