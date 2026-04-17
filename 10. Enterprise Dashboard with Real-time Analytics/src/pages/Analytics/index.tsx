import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

const Analytics = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      <Card className="glassmorphism">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Charts placeholder</Typography>
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="textSecondary">Detailed Analytics will be here</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;
