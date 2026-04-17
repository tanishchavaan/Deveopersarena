import { describe, it, expect } from 'vitest';
import authReducer, { loginStart, loginSuccess, logout } from './authSlice';

describe('auth slice', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginStart', () => {
    expect(authReducer(initialState, loginStart())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle loginSuccess', () => {
    const payload = { user: { name: 'Admin' }, token: 'abc' };
    expect(authReducer(initialState, loginSuccess(payload))).toEqual({
      user: { name: 'Admin' },
      token: 'abc',
      loading: false,
    });
  });

  it('should handle logout', () => {
    const state = {
      user: { name: 'Admin' },
      token: 'abc',
      loading: false,
    };
    expect(authReducer(state, logout())).toEqual(initialState);
  });
});
