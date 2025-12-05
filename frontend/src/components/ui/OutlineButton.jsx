import React from 'react';
import Button from '@mui/material/Button';

const OutlineButton = ({ children, onClick, fullWidth, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        padding: '9px 23px', // Slightly less padding to account for border
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OutlineButton;