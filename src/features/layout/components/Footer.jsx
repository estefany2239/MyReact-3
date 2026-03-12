import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Stack, 
  IconButton, 
  Button,
  TextField 
} from '@mui/material';
import { 
  Instagram, 
  Pinterest, 
  Favorite, 
  LocalPostOffice, 
  AutoGraph 
} from '@mui/icons-material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#FFFFFF', 
        color: '#555', 
        pt: 10, 
        pb: 4, 
        borderTop: '1px solid #fce4ec' // Rosa muy clarito
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          
          {/* Columna 1: Inspiración */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: 'serif', 
                fontWeight: 600, 
                color: '#f06292', // Rosa vibrante para el logo
                mb: 2 
              }}
            >
              MakeShop<span style={{ color: '#f8bbd0' }}>.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', mb: 3 }}>
              "Haciendo que cada detalle cuente. Tu estilo, nuestra pasión."
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#f06292', '&:hover': { bgcolor: '#fce4ec' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#f06292', '&:hover': { bgcolor: '#fce4ec' } }}>
                <Pinterest />
              </IconButton>
              <IconButton sx={{ color: '#f06292', '&:hover': { bgcolor: '#fce4ec' } }}>
                <AutoGraph />
              </IconButton>
            </Stack>
          </Grid>

          {/* Columna 2: Shop */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: '#333', letterSpacing: 1 }}>
              COLECCIONES
            </Typography>
            <Stack spacing={1.5}>
              {['Novedades', 'Best Sellers', 'Edición Limitada', 'Rebajas'].map((text) => (
                <Link 
                  key={text} 
                  href="#" 
                  underline="none" 
                  sx={{ color: '#888', fontSize: '0.85rem', '&:hover': { color: '#f06292' } }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Columna 3: Newsletter Aesthetic */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                bgcolor: '#fff5f8', // Fondo rosa pastel muy suave
                p: 4, 
                borderRadius: 4,
                textAlign: 'center',
                border: '1px dashed #f8bbd0'
              }}
            >
              <Typography variant="h6" sx={{ color: '#f06292', fontWeight: 600, mb: 1 }}>
                ¡Únete al Club Rosa!
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#a1887f' }}>
                Recibe un 10% de descuento en tu primera compra.
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField 
                  fullWidth 
                  size="small" 
                  placeholder="Tu correo mágico..."
                  sx={{ 
                    bgcolor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#f06292', 
                    '&:hover': { bgcolor: '#d81b60' },
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Enviar
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box 
          sx={{ 
            mt: 8, 
            pt: 3, 
            borderTop: '1px solid #fef2f4', 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="caption" sx={{ color: '#bcbcbc' }}>
            © {currentYear} MAKEUP SHOP. DISEÑADO CON AMOR.
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5, 
              color: '#f48fb1' 
            }}
          >
            Hecho con <Favorite sx={{ fontSize: 12 }} /> para ti
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};