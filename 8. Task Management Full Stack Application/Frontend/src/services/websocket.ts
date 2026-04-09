import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export type TaskUpdateCallback = (message: any) => void;

class WebSocketService {
    private client: Client | null = null;
    private callbacks: Set<TaskUpdateCallback> = new Set();
    
    connect() {
        if (this.client && this.client.active) return;
        
        const socketUrl = import.meta.env.VITE_WS_URL || '/ws';
        
        this.client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                this.client?.subscribe('/topic/tasks', (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    this.notifySubscribers(parsedMessage);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        
        this.client.activate();
    }
    
    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.client = null;
        }
    }
    
    subscribe(callback: TaskUpdateCallback) {
        this.callbacks.add(callback);
        return () => this.callbacks.delete(callback);
    }
    
    private notifySubscribers(message: any) {
        this.callbacks.forEach(callback => callback(message));
    }
}

export const webSocketService = new WebSocketService();
