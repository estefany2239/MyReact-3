import { Button, Typography, Box, Stack, Paper } from '@mui/material';
import React, { useState } from 'react';

export const UseState = () => {
  const [color, setColor] = useState("red");

  return (
    <Box sx={{ display: 'left', justifyContent: 'center', mt: 4 }}>
      
        
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          My favorite color is <span style={{ color: color, fontWeight: 'bold' }}>{color}</span>!
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant='contained'
            color='primary'
            onClick={() => setColor("blue")}
          >
            Blue
          </Button>

          <Button 
            variant='outlined'
            color='error'
            onClick={() => setColor("red")}
          >
            Red
          </Button>

          <Button
            variant='contained'
            color='secondary'
            onClick={() => setColor("pink")}
          >
            Pink
          </Button>

          <Button
            variant='outlined'
            color='success'
            onClick={() => setColor("green")}
          >
            Green
          </Button>
        </Stack>
        

    </Box>
  );
}

