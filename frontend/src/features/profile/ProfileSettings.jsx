import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PrimaryButton from '../../components/ui/PrimaryButton';

const ProfileSettings = () => {
  return (
    <Box>
      {/* Header with Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar 
          sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', mr: 2 }}
        >
          JD
        </Avatar>
        <Box>
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2" color="text.secondary">john.doe@example.com</Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <Grid container spacing={3}>
        <Grid>
          <TextField label="First Name" defaultValue="John" fullWidth />
        </Grid>
        <Grid>
          <TextField label="Last Name" defaultValue="Doe" fullWidth />
        </Grid>
        <Grid>
          <TextField label="Email Address" defaultValue="john.doe@example.com" fullWidth />
        </Grid>
        <Grid>
          <TextField label="Phone Number" defaultValue="+1 (555) 123-4567" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Shipping Address" defaultValue="123 Main St, New York, NY" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <PrimaryButton>Save Changes</PrimaryButton>
      </Box>
    </Box>
  );
};

export default ProfileSettings;