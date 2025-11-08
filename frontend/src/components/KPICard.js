import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

function KPICard({ icon: Icon, iconColor, iconBgColor, label, value, onClick, isActive, borderColor }) {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        bgcolor: '#f5f5f5',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: 2
        } : {},
        border: isActive ? `2px solid ${borderColor}` : 'none'
      }}
      onClick={onClick}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: iconBgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2
        }}>
          <Icon sx={{ color: iconColor }} />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default KPICard;

