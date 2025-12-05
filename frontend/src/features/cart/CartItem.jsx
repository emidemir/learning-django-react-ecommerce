import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add'; // Install @mui/icons-material
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ item }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center', boxShadow: 1 }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover' }}
        image={item.image}
        alt={item.title}
      />

      {/* Product Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: 2 }}>
        <Typography variant="h6" fontWeight="600">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {item.size} | Color: {item.color}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${item.price.toFixed(2)}
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', mx: 2, border: '1px solid #ddd', borderRadius: 1 }}>
        <IconButton size="small">
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Remove Button */}
      <IconButton color="error" aria-label="delete">
        <DeleteOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;