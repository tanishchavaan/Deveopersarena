import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import theme from '@/styles/theme';
import '@/styles/global.css';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ReduxProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </QueryProvider>
  );
};
