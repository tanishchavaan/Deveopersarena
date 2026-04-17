import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ChartData {
  id: string;
  name: string;
  value: number;
  timestamp: string;
}

export interface DashboardStats {
  sales: number;
  activeUsers: number;
  conversionRate: number;
}

interface DashboardState {
  stats: DashboardStats | null;
  chartData: ChartData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  stats: { sales: 1234, activeUsers: 1000, conversionRate: 3.2 },
  chartData: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    // Mock API call
    return {
      stats: { sales: 1567, activeUsers: 1245, conversionRate: 3.4 },
      chartData: []
    };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    optimisticUpdate: (state, action: PayloadAction<ChartData>) => {
      const index = state.chartData.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.chartData[index] = action.payload;
      }
    },
    revertUpdate: (state, action: PayloadAction<string>) => {
      // Revert logic
    },
    setRealTimeData: (state, action: PayloadAction<ChartData>) => {
      state.chartData.push(action.payload);
      if (state.chartData.length > 20) {
        state.chartData.shift();
      }
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.stats = action.payload.stats;
      state.loading = false;
    });
  }
});

export const { optimisticUpdate, revertUpdate, setRealTimeData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
