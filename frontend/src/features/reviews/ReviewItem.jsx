import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

const ReviewItem = ({ review }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar 
          sx={{ bgcolor: 'secondary.main', width: 40, height: 40, mr: 2 }}
          alt={review.userName}
          src={review.userAvatar} 
        >
          {review.userName.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            {review.userName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={review.rating} readOnly size="small" precision={0.5} />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {review.date}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="body2" color="text.primary" sx={{ ml: 7, mb: 2 }}>
        {review.comment}
      </Typography>
      <Divider light />
    </Box>
  );
};

export default ReviewItem;