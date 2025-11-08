import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

function HeaderSection({ onOpenDialog }) {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
          Good afternoon, User
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Here is your automation monitoring overview
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onOpenDialog}
        sx={{
          bgcolor: '#000',
          color: '#fff',
          borderRadius: '8px',
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontSize: '16px',
          '&:hover': {
            bgcolor: '#333'
          }
        }}
      >
        Create Automation
      </Button>
    </Box>
  );
}

export default HeaderSection;

