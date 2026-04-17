import { Middleware } from '@reduxjs/toolkit';

export const apiMiddleware: Middleware = (store) => (next) => (action) => {
  // Custom API tracking, logging or auth token injection could go here
  return next(action);
};
