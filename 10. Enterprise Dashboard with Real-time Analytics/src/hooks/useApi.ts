import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>() => {
  const [state, setState] = useState<ApiState<T>>({ data: null, loading: false, error: null });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await apiCall();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message || 'An error occurred during API fetch' });
      throw error;
    }
  }, []);

  return { ...state, execute };
};
