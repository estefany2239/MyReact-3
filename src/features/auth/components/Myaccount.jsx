import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Box, Container, Typography, Button, TextField, Card,
  CardContent, IconButton, InputAdornment, Stack,
  Divider, Fade, Snackbar, Alert
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const Myaccount = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [openWelcome, setOpenWelcome] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validate = () => {

    let tempErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      tempErrors.email = "El correo debe tener un @ y un dominio";
      isValid = false;
    }

    if (password.length < 8) {
      tempErrors.password = "Mínimo 8 caracteres";
      isValid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      tempErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (validate()) {

      const userData = isLogin
        ? { email, password }
        : { email, password, confirmPassword };

      console.log(
        isLogin ? 'Iniciando sesión...' : 'Registrando...',
        userData
      );

      if (isLogin) {
        setMensaje("💖 ¡Bienvenida a nuestra página!");
      } else {
        setMensaje("🌸 ¡Cuenta creada con éxito!");
      }

      setOpenWelcome(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (

    <Box
      sx={{
        bgcolor: '#fdf2f7',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 5
      }}
    >

      <Container maxWidth="xs">

        <Card
          sx={{
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(243,108,164,0.15)',
            border: '2px solid #f36ca4',
            overflow: 'hidden'
          }}
        >

          <CardContent sx={{ p: 4 }}>

            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>

              <Box
                sx={{
                  bgcolor: '#e776a5',
                  color: 'white',
                  p: 2,
                  borderRadius: '50%',
                  boxShadow: '0 8px 16px rgba(243,108,164,0.4)'
                }}
              >

                {isLogin
                  ? <LoginIcon sx={{ fontSize: 40 }} />
                  : <PersonAddIcon sx={{ fontSize: 40 }} />
                }

              </Box>

              <Typography
                variant="h4"
                fontWeight="900"
                sx={{ color: 'black', textAlign: 'center' }}
              >
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                {isLogin
                  ? 'Gestiona tu inventario de belleza'
                  : 'Crea tu acceso para empezar'
                }
              </Typography>

            </Stack>

            <form onSubmit={handleSubmit} noValidate>

              <Stack spacing={2.5}>

                <TextField
                  fullWidth
                  label="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#f36ca4' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: '16px' }
                  }}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#f36ca4' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">

                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword
                            ? <VisibilityOff />
                            : <Visibility />
                          }
                        </IconButton>

                      </InputAdornment>
                    ),
                    sx: { borderRadius: '16px' }
                  }}
                />

                {!isLogin && (

                  <Fade in={!isLogin}>

                    <TextField
                      fullWidth
                      label="Confirmar contraseña"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#f36ca4' }} />
                          </InputAdornment>
                        ),
                        sx: { borderRadius: '16px' }
                      }}
                    />

                  </Fade>
                )}

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    fontWeight: 'bold',
                    py: 1.8,
                    borderRadius: '16px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#f36ca4' }
                  }}
                >

                  {isLogin
                    ? 'Entrar al Sistema'
                    : 'Crear mi cuenta'
                  }

                </Button>

              </Stack>

            </form>

            <Divider sx={{ my: 3 }}>o</Divider>

            <Box sx={{ textAlign: 'center' }}>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  display: 'inline'
                }}
              >
                {isLogin
                  ? '¿No tienes una cuenta? '
                  : '¿Ya tienes una cuenta? '
                }
              </Typography>

              <Typography
                variant="body2"
                fontWeight="bold"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                sx={{
                  color: '#f36ca4',
                  cursor: 'pointer',
                  display: 'inline',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >

                {isLogin
                  ? 'Regístrate aquí'
                  : 'Inicia sesión'
                }

              </Typography>

            </Box>

          </CardContent>

        </Card>

      </Container>


      <Snackbar
        open={openWelcome}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >

        <Alert
          sx={{
            bgcolor: '#f36ca4',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '12px'
          }}
        >
          {mensaje}
        </Alert>

      </Snackbar>

    </Box>
  );
};

export default Myaccount;