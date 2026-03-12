import React, { useState } from 'react';
import { Typography, Paper, Box, Avatar, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


export const UserDisplay = ({ name }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
      <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
        {name.charAt(0)}
      </Avatar>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Bienvenida de nuevo, {name}.
      </Typography>
    </Box>
  );
};


export const Component1 = () => {
  const [user, setUser] = useState("Estefany");

  return (
    <Paper 
      elevation={3} 

      sx={{ 
        p: 3, 
        borderRadius: 4, 
        maxWidth: 350,
        textAlign: 'center',
        borderLeft: '6px solid #9c27b0' 
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <PersonIcon color="secondary" sx={{ fontSize: 40 }} />
      </Box>

      <Typography variant="h6" gutterBottom>
        Perfil de Usuario
      </Typography>
      
      <Divider sx={{ my: 1 }} />

      <UserDisplay name={user} />

      <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.disabled' }}>
        ID de sesión: Activa
      </Typography>
    </Paper>
  );
};