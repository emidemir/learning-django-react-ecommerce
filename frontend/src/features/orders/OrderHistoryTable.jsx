import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import OutlineButton from '../../components/ui/OutlineButton';

const MOCK_ORDERS = [
  { id: '#2001539', date: 'Oct 24, 2024', total: 424.99, status: 'Processing', items: 3 },
  { id: '#2001538', date: 'Oct 12, 2024', total: 55.00, status: 'Delivered', items: 1 },
  { id: '#2001537', date: 'Sep 05, 2024', total: 129.95, status: 'Delivered', items: 2 },
  { id: '#2001536', date: 'Aug 22, 2024', total: 19.99, status: 'Cancelled', items: 1 },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Processing': return 'primary';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const OrderHistoryTable = () => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="order history table">
        <TableHead sx={{ bgcolor: 'grey.50' }}>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK_ORDERS.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {order.id}
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Chip 
                  label={order.status} 
                  color={getStatusColor(order.status)} 
                  size="small" 
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <OutlineButton size="small">View Details</OutlineButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistoryTable;