import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularIndeterminat = () => {
  return (
      <div className={'absolute inset-0 w-screen flex h-screen items-center justify-around bg-indigo-500 bg-opacity-50'}>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size={120} thickness={4} sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#3a3ef2' : '#308fe8'),
          animationDuration: '1000ms',
        
        }}/>
        </Box>
      </div>
    
  );
}

export default CircularIndeterminat;