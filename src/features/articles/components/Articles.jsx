import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Button, Card, CardContent, 
  CardMedia, Grid, Stack 
} from '@mui/material';

// ICONOS
import HeartBrokenTwoToneIcon from '@mui/icons-material/HeartBrokenTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';


const ProductItem = memo(({ item, esFavorito, onToggle, onAgregar, priority }) => (
  <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Card sx={{ 
      maxWidth: 315, width: '100%', height: '100%', borderRadius: 4, 
      border: '2px solid #f36ca4', 
      boxShadow: 3,
      display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: 6, border: '2px solid #000' }
    }}>
      <Box sx={{ p: 2 }}>
        <CardMedia 
          component="img"
          image={item.img}
          alt={item.nombre}
          loading={priority ? "eager" : "lazy"} 
          decoding="async"
          sx={{ width: "100%", height: "170px", objectFit: 'contain', bgcolor: '#fdfdfd', borderRadius: 2 }} 
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem', mb: 1 }}>{item.nombre}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '40px', overflow: 'hidden' }}>{item.desc}</Typography>
        <Typography variant="h5" fontWeight="700" color="#f36ca4">${item.precio}</Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => onAgregar(item)}
            startIcon={<ShoppingCartTwoToneIcon />} 
            sx={{ 
              bgcolor: '#f36ca4', // <--- Botón Rosado
              color: 'white', 
              borderRadius: '12px', 
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#d15a8a' } 
            }}
          >
            Agregar
          </Button>
          <Button 
            fullWidth variant="contained" onClick={() => onToggle(item)}
            startIcon={esFavorito ? <FavoriteIcon /> : <HeartBrokenTwoToneIcon />}
            sx={{ bgcolor: esFavorito ? '#f36ca4' : 'black', borderRadius: '12px', fontWeight: 'bold' }}
          >
            {esFavorito ? 'love it' : 'favorito'}
          </Button>
        </Stack>
      </Box>
    </Card>
  </Grid>
));

// --- 2. BANNER ---
const CustomBanner = memo(({ titulo, boton, imagen }) => (
  <Grid item xs={12}> 
    <Box sx={{ 
      my: 4, width: '100%', height: { xs: '200px', md: '350px' },
      border: '2px solid #000', borderRadius: '25px', overflow: 'hidden', position: 'relative'
    }}>
      <CardMedia component="img" image={imagen} alt={titulo} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <Box sx={{ position: "absolute", inset: 0, bgcolor: 'rgba(0,0,0,0.25)', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", px: 2 }}>
        <Typography variant="h3" fontWeight="900" sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)', mb: 2, textAlign: 'center', fontSize: { xs: '1.6rem', md: '3.5rem' } }}>{titulo}</Typography>
        <Button variant="contained" sx={{ bgcolor: '#f36ca4', fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 10 }}>{boton}</Button>
      </Box>
    </Box>
  </Grid>
));

const Articles = () => {
  const navigate = useNavigate();

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem("mis_favoritos");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const toggleFavorito = useCallback((producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((fav) => fav.nombre === producto.nombre);
      const nuevaLista = existe ? prev.filter((fav) => fav.nombre !== producto.nombre) : [...prev, producto];
      localStorage.setItem("mis_favoritos", JSON.stringify(nuevaLista));
      window.dispatchEvent(new Event("favoritos-actualizados"));
      return nuevaLista;
    });
  }, []);

  const agregarAlCarrito = useCallback((producto) => {
    const guardados = localStorage.getItem("mi_carrito");
    const carritoActual = guardados ? JSON.parse(guardados) : [];
    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem("mi_carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carrito-actualizado"));
    navigate('/articles');
  }, [navigate]);

  const productos = useMemo(() => [
    { nombre: "Corrector", precio: "20.000", img: "/img/corr.webp", desc: "Mirada descansada, natural y linda." },
    { nombre: "Iluminador", precio: "15.000", img: "/img/ilu.webp", desc: "Brillo celestial para resaltar tu rostro." },
    { nombre: "Rubor", precio: "10.000", img: "/img/rub.webp", desc: "Mejillas radiantes con un toque lindo." },
    { nombre: "Pestañina", precio: "15.000", img: "/img/pesta.webp", desc: "Pestañas infinitas y curvas perfectas." },
    { nombre: "Base", precio: "15.000", img: "/img/base.webp", desc: "Piel de seda con acabado profesional." },
    { nombre: "Gloss", precio: "15.000", img: "/img/glu.webp", desc: "Labios jugosos y con brillo espejo lindo." },
    { nombre: "Delineador", precio: "15.000", img: "/img/deline.webp", desc: "Trazo preciso para una mirada de gato." },
    { nombre: "Polvo", precio: "15.000", img: "/img/polvo.webp", desc: "Sella tu maquillaje con efecto lindo wow." },
    { nombre: "Labial", precio: "15.000", img: "/img/labia.webp", desc: "Color intenso que abraza tu labio wo." },
    { nombre: "Paleta de Sombras", precio: "15.000", img: "/img/pali.webp", desc: "Colores mágicos para tus lindo." },
    { nombre: "Bronzer", precio: "15.000", img: "/img/bron.webp", desc: "Contorno cálido y efecto solo para tí." },
    { nombre: "Agua Micelar", precio: "15.000", img: "/img/ag.avif", desc: "Limpieza suave que mima tu piel wow." },
  ], []);

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '90vh', py: 5 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="800" sx={{ mb: 6, textAlign: 'center' }}>
          Nuestros Productos <br />
          <Typography component="span" variant="h6" color="text.secondary">Encuentra tu estilo ideal</Typography>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {productos.map((item, index) => {
            const esFavorito = favoritos.some((fav) => fav.nombre === item.nombre);
            return (
              <React.Fragment key={item.nombre}>
                {index === 4 && <CustomBanner titulo="¡NUEVA COLECCIÓN PRIMAVERA!" boton="VER NOVEDADES" imagen="/img/pri.avif" />}
                {index === 8 && <CustomBanner titulo="¡NUEVOS PRODUCTOS!" boton="VER NOVEDADES" imagen="/img/prim.avif" />}

                <ProductItem 
                  item={item} 
                  esFavorito={esFavorito} 
                  onToggle={toggleFavorito} 
                  onAgregar={agregarAlCarrito} 
                  priority={index < 4} 
                />
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Articles;