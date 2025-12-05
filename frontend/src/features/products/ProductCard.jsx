import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import OutlineButton from '../../components/ui/OutlineButton'; // Reuse our button

const ProductCard = ({ product }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Category Tag */}
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
          {product.category}
        </Typography>
        
        {/* Title */}
        <Typography gutterBottom variant="h6" component="div" sx={{ mt: 1, lineHeight: 1.2 }}>
          {product.title}
        </Typography>
        
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" precision={0.5} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount})
          </Typography>
        </Box>

        {/* Price */}
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <OutlineButton fullWidth>
          Add to Cart
        </OutlineButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;