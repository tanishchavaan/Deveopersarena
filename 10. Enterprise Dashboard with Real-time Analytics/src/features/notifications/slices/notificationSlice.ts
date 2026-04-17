import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationMsg {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

interface NotificationState {
  messages: NotificationMsg[];
  unreadCount: number;
}

const initialState: NotificationState = {
  messages: [{
    id: '1',
    message: 'Welcome to Enterprise Dashboard',
    type: 'info',
    read: false,
    timestamp: new Date().toISOString()
  }],
  unreadCount: 1,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationMsg>) => {
      state.messages.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find(m => m.id === action.payload);
      if (msg && !msg.read) {
        msg.read = true;
        state.unreadCount -= 1;
      }
    },
  },
});

export const { addNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
