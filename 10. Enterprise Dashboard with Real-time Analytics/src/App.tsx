import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { AppProvider } from '@/app/providers/AppProvider';
import { AuthGuard } from '@/components/templates/AuthGuard';

const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const AnalyticsPage = lazy(() => import('@/pages/Analytics'));
const SettingsPage = lazy(() => import('@/pages/Settings'));
const LoginPage = lazy(() => import('@/pages/Login'));

const LoadingFallback = () => <div style={{ padding: 20, color: 'white' }}>Loading application...</div>;

// Specific route data preloading mechanism via Router v6 
const dashboardLoader = async () => {
  // Can be hooked to directly dispatch initial fetches prior to render completion
  return { metadata: 'Dashboard Loaded' };
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense>
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense>,
            loader: dashboardLoader
          },
          {
            path: '/analytics',
            element: <Suspense fallback={<LoadingFallback />}><AnalyticsPage /></Suspense>
          },
          {
            path: '/settings',
            element: <Suspense fallback={<LoadingFallback />}><SettingsPage /></Suspense>
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
    </AppProvider>
  );
}

export default App;
