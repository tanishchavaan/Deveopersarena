import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('Mock WebSocket server running on ws://localhost:8080');

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Push data every 2 seconds
  const interval = setInterval(() => {
    const mockData = {
      type: 'CHART_DATA',
      payload: {
        id: Math.random().toString(36).substring(2, 11),
        name: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date().toISOString()
      }
    };
    ws.send(JSON.stringify(mockData));
  }, 2000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
