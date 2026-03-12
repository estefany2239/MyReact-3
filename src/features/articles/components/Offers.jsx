import React from 'react';
import { Box, Stack, Typography, Paper, Container } from '@mui/material';
import { UseState } from '../hooks/UseState'; 
import { Timer } from '../hooks/useEffect'; 
import { Component1 } from '../hooks/UseContent'; 
import { StatusBar } from '../hooks/useOnlineStatus'; 
import { App } from '../hooks/UseReff';
import { reducer } from '../hooks/UseReducer';



export const Offers = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Mis Hooks en Acción
      </Typography>
      
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Estado Online</Typography>
          <StatusBar />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Contador (useState)</Typography>
          <UseState />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Puntajes (useReducer)</Typography>
          <reducer />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Temporizador (useEffect)</Typography>
          <Timer />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Contenido de Usuario (useContext)</Typography>
          <Component1 />
        </Paper>
      </Stack>
    </Container>
  );
};