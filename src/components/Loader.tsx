import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 56px)"
      bgcolor="background.default"
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Načítavam...
      </Typography>
    </Box>
  );
}