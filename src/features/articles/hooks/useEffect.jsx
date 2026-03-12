import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icono de reloj

export const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <Paper  
      sx={{ 
        p: 3, 
        borderRadius: 4, 
        background: 'linear-gradient(145deg, #ffffff 0%, #f0f4f8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgba(0,0,0,0.05)',
        minWidth: 200
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: 'primary.main', 
          mb: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)' 
        }}
      >
        <AccessTimeIcon />
      </Avatar>

      <Typography 
        variant="overline" 
        sx={{ fontWeight: 'bold', color: 'text.secondary', letterSpacing: 1.5 }}
      >
        Contador Activo
      </Typography>

      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 800, 
          color: 'primary.dark',
          fontFamily: 'monospace' 
        }}
      >
        {count}
      </Typography>

      <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1 }}>
        segundos transcurridos
      </Typography>
    </Paper>
  );
};