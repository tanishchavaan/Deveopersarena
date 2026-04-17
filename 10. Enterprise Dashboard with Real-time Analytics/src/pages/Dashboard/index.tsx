import { Typography, Box, Card, CardContent, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '@/app/hooks';
import { useWebSocket } from '@/hooks/useWebSocket';

const Dashboard = () => {
  // Connect to mock WS server
  useWebSocket('ws://localhost:8080');
  
  const stats = useAppSelector(state => state.dashboard.stats);
  const chartData = useAppSelector(state => state.dashboard.chartData);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Box>
          <Card className="glassmorphism">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Sales</Typography>
              <Typography variant="h3">${stats?.sales.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card className="glassmorphism">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Active Users</Typography>
              <Typography variant="h3">{stats?.activeUsers.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card className="glassmorphism">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Conversion Rate</Typography>
              <Typography variant="h3">{stats?.conversionRate}%</Typography>
            </CardContent>
          </Card>
        </Box>
        
        {/* Chart Section */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Card className="glassmorphism" sx={{ minHeight: 400 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" gutterBottom>Real-time Sales Data</Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8,Name,Value\n" + chartData.map(e => `${e.name},${e.value}`).join("\n");
                    const link = document.createElement("a");
                    link.setAttribute("href", encodeURI(csvContent));
                    link.setAttribute("download", "analytics_export.csv");
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                >
                  Export CSV
                </Button>
              </Box>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: 8 }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#ec4899', stroke: '#ec4899' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
