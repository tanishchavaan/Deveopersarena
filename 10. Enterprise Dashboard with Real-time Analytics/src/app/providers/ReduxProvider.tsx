import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/store';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div style={{color: 'white', padding: '20px'}}>Loading Persistent State...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
