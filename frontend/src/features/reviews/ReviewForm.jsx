import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import PrimaryButton from '../../components/ui/PrimaryButton';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    // Add logic to submit review to backend
    setComment('');
    setRating(0);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 6, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography component="legend" variant="body2" color="text.secondary">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>

      <TextField
        label="Your Review"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What did you like or dislike?"
        sx={{ mb: 2, bgcolor: 'white' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PrimaryButton type="submit" disabled={!rating || !comment}>
          Post Review
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default ReviewForm;