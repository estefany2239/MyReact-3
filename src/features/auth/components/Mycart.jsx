import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, Typography, Box, Button, List, ListItem, 
  ListItemText, Avatar, Divider, IconButton, Paper, Stack 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const MyCart = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("mi_carrito");
    if (guardados) {
      const datos = JSON.parse(guardados);
      const datosConCantidad = datos.map(item => ({
        ...item,
        cantidad: item.cantidad || 1
      }));
      setProductos(datosConCantidad);
    }
  }, []);

  const actualizarLocalStorage = (nuevaLista) => {
    setProductos(nuevaLista);
    localStorage.setItem("mi_carrito", JSON.stringify(nuevaLista));
    window.dispatchEvent(new Event("carrito-actualizado"));
  };

  const modificarCantidad = (index, delta) => {
    const nuevaLista = [...productos];
    const nuevaCantidad = nuevaLista[index].cantidad + delta;

    if (nuevaCantidad > 0) {
      nuevaLista[index].cantidad = nuevaCantidad;
      actualizarLocalStorage(nuevaLista);
    } else {
      eliminarProducto(index);
    }
  };

  const eliminarProducto = (indexAEliminar) => {
    const nuevoCarrito = productos.filter((_, index) => index !== indexAEliminar);
    actualizarLocalStorage(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    actualizarLocalStorage([]);
  };

  const total = useMemo(() => {
    return productos.reduce((acc, item) => {
      const precioLimpio = parseInt(item.precio.replace(/\./g, ''));
      return acc + (precioLimpio * (item.cantidad || 1));
    }, 0);
  }, [productos]);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: '#f36ca4' }} />
        <Typography variant="h4" fontWeight="800">Tu Carrito</Typography>
      </Stack>
      
      {productos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#f9f9f9', borderRadius: 4 }}>
          <Typography variant="h6" color="text.secondary">Tu carrito está vacío.</Typography>
          <Button href="/Articles" sx={{ mt: 2, color: '#f36ca4', fontWeight: 'bold' }}>Volver a la tienda</Button>
        </Box>
      ) : (
        <Stack spacing={4}>
          <List component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 4, overflow: 'hidden' }}>
            {productos.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem 
                  secondaryAction={
                    <IconButton edge="end" onClick={() => eliminarProducto(index)} color="error">
                      <DeleteOutlineIcon />
                    </IconButton>
                  }
                  sx={{ py: 3, px: 3 }}
                >
                  <Avatar 
                    src={item.img} 
                    variant="rounded" 
                    sx={{ width: 80, height: 80, mr: 3, border: '1px solid #f36ca4', bgcolor: '#fff' }} 
                  />
                  
                  <ListItemText 
                    primary={item.nombre} 
                    secondary={`$${item.precio} c/u`} 
                    primaryTypographyProps={{ fontWeight: '700', fontSize: '1.2rem' }}
                    secondaryTypographyProps={{ color: 'text.secondary', fontWeight: '500' }}
                    sx={{ flexGrow: 1 }}
                  />

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 4, bgcolor: '#fdf2f7', borderRadius: 3, p: 0.5 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => modificarCantidad(index, -1)}
                      sx={{ color: '#f36ca4', '&:hover': { bgcolor: '#f36ca4', color: 'white' } }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    
                    <Typography sx={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                      {item.cantidad}
                    </Typography>
                    
                    <IconButton 
                      size="small" 
                      onClick={() => modificarCantidad(index, 1)}
                      sx={{ color: '#f36ca4', '&:hover': { bgcolor: '#f36ca4', color: 'white' } }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </ListItem>
                {index < productos.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', border: '2px solid #000' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Total a pagar:</Typography>
              <Typography variant="h4" fontWeight="900" color="#f36ca4">
                ${total.toLocaleString('es-CO')}
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                fullWidth 
                variant="outlined" 
                color="error" 
                onClick={vaciarCarrito}
                sx={{ borderRadius: 3, py: 1.5, fontWeight: 'bold', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
              >
                Vaciar Carrito
              </Button>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  bgcolor: 'black', 
                  color: 'white', 
                  borderRadius: 3, 
                  py: 1.5, 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#333' } 
                }}
              >
                Pagar Ahora
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}
    </Container>
  );
};

export default MyCart;