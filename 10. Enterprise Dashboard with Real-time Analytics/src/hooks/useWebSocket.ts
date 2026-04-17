import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { setRealTimeData } from '@/features/dashboard/slices/dashboardSlice';
import WebSocketService from '@/services/websocket/WebSocketService';

export const useWebSocket = (url: string) => {
  const dispatch = useAppDispatch();
  const wsService = useRef<WebSocketService | null>(null);
  
  const handleMessage = useCallback((data: any) => {
    // Handling incoming data
    if (data.type === 'CHART_DATA') {
      dispatch(setRealTimeData(data.payload));
    }
  }, [dispatch]);
  
  useEffect(() => {
    wsService.current = new WebSocketService(url);
    wsService.current.onMessage(handleMessage);
    wsService.current.connect();
    
    return () => {
      wsService.current?.disconnect();
    };
  }, [url, handleMessage]);
  
  const send = useCallback((data: any) => {
    wsService.current?.send(data);
  }, []);
  
  return { send };
};
