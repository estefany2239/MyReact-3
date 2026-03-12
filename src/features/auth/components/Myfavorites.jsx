import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Typography, Button, Card, CardContent, 
  CardMedia, Grid, IconButton, Stack 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const Myfavorites = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  // Cargar favoritos al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem("mis_favoritos");
    if (saved) {
      setFavoritos(JSON.parse(saved));
    }
  }, []);

  // --- FUNCIÓN PARA ELIMINAR Y ACTUALIZAR EL NÚMERO ---
  const eliminarFavorito = (nombre) => {
    const nuevosFavoritos = favoritos.filter(fav => fav.nombre !== nombre);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("mis_favoritos", JSON.stringify(nuevosFavoritos));
    
    // IMPORTANTE: Esto avisa al Header para que el número baje al instante
    window.dispatchEvent(new Event("favoritos-actualizados"));
  };

  // --- FUNCIÓN PARA COMPRAR DESDE FAVORITOS ---
  const agregarAlCarrito = useCallback((producto) => {
    const guardados = localStorage.getItem("mi_carrito");
    const carritoActual = guardados ? JSON.parse(guardados) : [];
    
    // Normalizamos el objeto para que MyCart lo entienda
    const nuevoProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img
    };

    const nuevoCarrito = [...carritoActual, nuevoProducto];
    localStorage.setItem("mi_carrito", JSON.stringify(nuevoCarrito));
    
    // Avisamos al Header que hay algo nuevo en el carrito
    window.dispatchEvent(new Event("carrito-actualizado"));
    
    // Redirigimos a la página del carrito
    navigate('/mycart');
  }, [navigate]);

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        <Button 
          startIcon={<ArrowBackIosNewIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: 'black', fontWeight: 'bold' }}
        >
          Volver a la tienda
        </Button>

        <Typography variant="h3" fontWeight="900" sx={{ mb: 1, textAlign: 'center', color: '#f36ca4' }}>
          Mis Favoritos ❤️
        </Typography>

        {favoritos.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h5" color="text.secondary">
              Aún no tienes productos favoritos.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {favoritos.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  display: 'flex', 
                  borderRadius: 4, 
                  height: '160px',
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: '0.3s',
                  '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }
                }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 140, objectFit: 'cover', bgcolor: '#f9f9f9' }}
                    image={item.img}
                    alt={item.nombre}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                        {item.nombre}
                      </Typography>
                      <Typography variant="subtitle1" color="#f36ca4" fontWeight="800" sx={{ mt: 1 }}>
                        ${item.precio}
                      </Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => agregarAlCarrito(item)}
                        startIcon={<ShoppingCartTwoToneIcon />}
                        sx={{ 
                          bgcolor: '#f36ca4', 
                          borderRadius: 2, 
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#000' }
                        }}
                      >
                        Comprar
                      </Button>
                      
                      <IconButton 
                        onClick={() => eliminarFavorito(item.nombre)} 
                        color="error"
                        sx={{ bgcolor: '#fff5f5' }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Myfavorites;