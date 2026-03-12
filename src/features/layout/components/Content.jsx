import React, { useRef, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Importamos para navegar
import {
  Box, Container, Typography, Button, Card, CardContent, Stack, CardMedia, IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';

const PRODUCTOS_MAQUILLAJE = [
  { id: 1, titulo: 'Milk Product', precio: '20.000', foto: '/img/milk.webp' },
  { id: 2, titulo: 'Gloss', precio: '22.500', foto: '/img/gloss.webp' },
  { id: 3, titulo: 'Base', precio: '35.000', foto: '/img/base.webp' },
  { id: 4, titulo: 'Pestañina', precio: '18.000', foto: '/img/sky.webp' },
  { id: 5, titulo: 'Paleta de Sombras', precio: '22.000', foto: '/img/pale.webp' },
  { id: 6, titulo: 'Polvo Suelto', precio: '22.000', foto: '/img/polvo.webp' },
  { id: 7, titulo: 'Delineador', precio: '15.000', foto: '/img/deline.webp' },
  { id: 8, titulo: 'Labial', precio: '20.000', foto: '/img/labia.webp' },
];

// --- PRODUCT CARD ACTUALIZADA ---
const ProductCard = memo(({ producto, priority, onAgregar }) => (
  <Box sx={{
    minWidth: { xs: '85%', sm: '280px', md: '280px' },
    scrollSnapAlign: 'center',
    transition: 'transform 0.3s ease-out',
    '&:hover': { transform: 'scale(1.02)' }
  }}>
    <Card sx={{
      height: '100%',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
      border: '2px solid #f36ca4',
    }}>

      <CardMedia
        component="img"
        image={producto.foto}
        alt={producto.titulo}
        loading={priority ? "eager" : "lazy"}
        width="280"
        height="250"
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}>
          {producto.titulo}
        </Typography>

        <Typography color="#f36ca4" sx={{ fontWeight: 'bold', mb: 2 }}>
          ${producto.precio}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onAgregar(producto)}
          startIcon={<AddShoppingCartTwoToneIcon />}
          sx={{
            bgcolor: '#000000', // <--- Botón Rosado
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.5,
            '&:hover': { bgcolor: '#eb8fb4' }
          }}
        >
          Agregar
        </Button>

      </CardContent>
    </Card>
  </Box>
));

export const Content = () => {
  const navigate = useNavigate(); // <--- Hook para navegar
  const scrollRef = useRef(null);

  // --- LÓGICA DE AGREGAR AL CARRITO ---
  const agregarAlCarrito = useCallback((producto) => {
    const guardados = localStorage.getItem("mi_carrito");
    const carritoActual = guardados ? JSON.parse(guardados) : [];
    
    // Mapeamos los datos para que coincidan con el formato de MyCart
    const nuevoProducto = {
      nombre: producto.titulo,
      precio: producto.precio,
      img: producto.foto
    };

    const nuevoCarrito = [...carritoActual, nuevoProducto];
    localStorage.setItem("mi_carrito", JSON.stringify(nuevoCarrito));
    
    // Disparamos el evento para el Header
    window.dispatchEvent(new Event("carrito-actualizado"));
    
    // Redirigimos a MyCart
    navigate('/');
  }, [navigate]);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 600 ? 300 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <Box component="main" sx={{ bgcolor: '#ffffff', pb: 10, minHeight: '100vh', overflowX: 'hidden' }}>

      <Box
        sx={{
          position: "relative",
          margin: { xs: "10px auto", md: "40px auto" },
          width: { xs: "80%", md: "93%" },
          borderRadius: "24px",
          overflow: "hidden",
          border: "2px solid #f36ca4"
        }}
      >

        <CardMedia
          component="img"
          image="/img/fon.avif"
          alt="Banner maquillaje"
          loading="eager"
          width="1200"
          height="350"
          sx={{
            width: '100%',
            height: { xs: '250px', md: '350px' },
            objectFit: 'cover'
          }}
        />

        <Container
          maxWidth="md"
          sx={{
            position: "absolute",
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
            textAlign: "right"
          }}
        >
          <Typography
            variant="h1"
            align="right"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3.75rem' }
            }}
          >
            Ven aquí, sí, a mí
          </Typography>

          <Typography
            variant="h5"
            align="right"
            sx={{
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.5rem' }
            }}
          >
            Ven y notarás la diferencia
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => navigate('/articles')} // <--- Navega a productos
              sx={{
                bgcolor: "black",
                borderRadius: "20px",
                px: 3,
                py: 1,
                fontSize: "0.9rem"
              }}
            >
              Ver Artículos
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate('/myaccount')} // <--- Navega a MyAccount
              sx={{
                bgcolor: "black",
                borderRadius: "20px",
                px: 3,
                py: 1,
                fontSize: "0.9rem"
              }}
            >
              Crear Cuenta
            </Button>
          </Stack>
        </Container>

      </Box>

      <Container maxWidth="xl">

        <Typography
          variant="h4"
          sx={{
            mb: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          Más Vendidos
        </Typography>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <IconButton
            onClick={() => scroll('left')}
            aria-label="Anterior"
            sx={{
              position: 'absolute',
              left: { md: -20, lg: 0 },
              zIndex: 10,
              bgcolor: 'white',
              display: { xs: 'none', md: 'flex' },
              boxShadow: 3
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 3,
              py: 2,
              px: { xs: 4, md: 6 },
              width: '100%',
              maxWidth: '1200px',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              borderRadius: '20px',
            }}
          >

            {PRODUCTOS_MAQUILLAJE.map((producto, index) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                priority={index < 3}
                onAgregar={agregarAlCarrito} 
              />
            ))}

          </Box>

          <IconButton
            onClick={() => scroll('right')}
            aria-label="Siguiente"
            sx={{
              position: 'absolute',
              right: { md: -20, lg: 0 },
              zIndex: 10,
              bgcolor: 'white',
              display: { xs: 'none', md: 'flex' },
              boxShadow: 3
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

        </Box>

      </Container>
    </Box>
  );
};

export default Content;