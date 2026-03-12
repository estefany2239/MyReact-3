import React from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Divider, IconButton, Paper, Grid 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Asumiendo que recibes los items y funciones por props
const Mycart = ({ items = [], onUpdateQty, onRemove, onClear }) => {
  
  const calcularTotal = () => {
    return items.reduce((acc, item) => {
      const precio = parseFloat(item.precio.replace(/\./g, ''));
      return acc + (precio * item.cantidad);
    }, 0);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <ShoppingCartIcon sx={{ color: '#d32f2f' }} />
          <Typography variant="h5" fontWeight="bold">Mi Carrito</Typography>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Tienes {items.length} artículos en tu carrito.
        </Typography>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          {items.length === 0 ? (
            <Typography sx={{ py: 4, textAlign: 'center' }}>El carrito está vacío</Typography>
          ) : (
            <>
              {items.map((item) => (
                <Box key={item.nombre} sx={{ mb: 2 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                      <Box component="img" src={item.img} sx={{ width: '100%', borderRadius: 1 }} />
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.nombre} <small style={{ fontWeight: 400, color: '#666' }}>${item.precio}</small>
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                        <IconButton size="small" sx={{ border: '1px solid #ddd' }} onClick={() => onUpdateQty(item.nombre, -1)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography fontWeight="bold">{item.cantidad}</Typography>
                        <IconButton size="small" sx={{ border: '1px solid #ddd' }} onClick={() => onUpdateQty(item.nombre, 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ ml: 2 }}>
                          Subtotal: <strong>${(parseFloat(item.precio.replace(/\./g, '')) * item.cantidad).toLocaleString('es-CO')}</strong>
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={4} textAlign="right">
                      <IconButton color="error" onClick={() => onRemove(item.nombre)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="900">
                  Total: ${calcularTotal().toLocaleString('es-CO')}
                </Typography>
                
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={onClear} sx={{ color: '#666', borderColor: '#ccc' }}>
                    VACIAR CARRITO
                  </Button>
                  <Button variant="contained" sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' }, px: 4 }}>
                    PAGAR
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Mycart;