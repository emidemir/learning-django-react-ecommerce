import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

// Mock Data
const MOCK_REVIEWS = [
  { id: 1, userName: 'Sarah Jenkins', rating: 5, date: '2 days ago', comment: 'Absolutely love this product! The quality is amazing for the price.' },
  { id: 2, userName: 'Mike Ross', rating: 4, date: '1 week ago', comment: 'Good value, but shipping took a little longer than expected.' },
  { id: 3, userName: 'Jessica Pearson', rating: 5, date: '2 weeks ago', comment: 'Exactly what I was looking for. Highly recommend.' },
];

const ReviewSection = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Customer Reviews ({MOCK_REVIEWS.length})
      </Typography>
      
      {/* Review Form */}
      <ReviewForm />

      {/* Review List */}
      <Box>
        {MOCK_REVIEWS.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Box>
    </Box>
  );
};

export default ReviewSection;