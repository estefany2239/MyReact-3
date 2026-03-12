import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AppBar, Button, Toolbar, Typography, Box, TextField, Stack, 
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge 
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [favoritosCount, setFavoritosCount] = useState(0);
  const [carritoCount, setCarritoCount] = useState(0);

 const actualizarContadores = () => {
    const favs = localStorage.getItem("mis_favoritos");
    setFavoritosCount(favs ? JSON.parse(favs).length : 0);

    const cart = localStorage.getItem("mi_carrito");
    setCarritoCount(cart ? JSON.parse(cart).length : 0);
  };

  useEffect(() => {
    actualizarContadores();

    window.addEventListener('favoritos-actualizados', actualizarContadores);
    window.addEventListener('carrito-actualizado', actualizarContadores);
    window.addEventListener('storage', actualizarContadores);

    return () => {
      window.removeEventListener('favoritos-actualizados', actualizarContadores);
      window.removeEventListener('carrito-actualizado', actualizarContadores);
      window.removeEventListener('storage', actualizarContadores);
    };
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: 'Inicio', icon: <HomeTwoToneIcon />, to: '/' },
    { text: 'Artículos', icon: <AutoAwesomeTwoToneIcon />, to: '/articles' },
    { text: 'Ofertas', icon: <LocalOfferTwoToneIcon />, to: '/offers' },
    { text: 'Mi Cuenta', icon: <PeopleAltTwoToneIcon />, to: '/myaccount' },
    { text: 'Compras', icon: <ShoppingBagTwoToneIcon />, to: '/mybuys' },
    { text: 'Favoritos', icon: <FavoriteTwoToneIcon />, to: '/myfavorites' },
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: '#ffffff', height: '100%' }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center', fontWeight: 'bold' }}>MAKEUP SHOP</Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={NavLink} to={item.to}>
              <ListItemIcon>
                {item.text === 'Favoritos' ? (
                  <Badge badgeContent={favoritosCount} color="error" showZero={false}>
                    {item.icon}
                  </Badge>
                ) : item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1300, display: 'flex', justifyContent: 'center', pt: 2 }}>
        <Box sx={{ width: '93%', maxWidth: '1450px', bgcolor: '#ffffff', border: '2px solid #000000', borderRadius: '20px', overflow: 'hidden' }}>
          <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'transparent' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              
              {/* Logo y Menú móvil */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 1, display: { md: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Makeup Shop</Typography>
              </Box>

              
              <TextField 
                size="small" 
                placeholder="Buscar..." 
                sx={{ 
                  display: { xs: 'none', lg: 'flex' }, 
                  mx: 2, 
                  width: '250px',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                }}
                InputProps={{ endAdornment: <SearchRoundedIcon /> }}
              />

              <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {menuItems.map((item) => (
                  <Button 
                    key={item.text}
                    component={NavLink} 
                    to={item.to} 
                    startIcon={
                      item.text === 'Favoritos' ? (
                        <Badge badgeContent={favoritosCount} color="error" showZero={false}>
                          {item.icon}
                        </Badge>
                      ) : item.icon
                    }
                    color="inherit"
                    sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Stack>

             
              <IconButton component={NavLink} to='/Mycart' color="inherit">
                <Badge badgeContent={carritoCount} color="primary" showZero={false}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

            </Toolbar>
          </AppBar>
        </Box>
      </Box>

      <Box sx={{ height: { xs: '100px', md: '120px' } }} />

      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: 'block', md: 'none' } }}>
        {drawer}
      </Drawer>
    </header>
  );
};