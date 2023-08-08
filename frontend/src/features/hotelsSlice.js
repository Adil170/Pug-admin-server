import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/HotelApi';

// Async thunk to fetch hotels from the backend
export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
  const data = await api.getHotels();
  return data;
});

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default hotelsSlice.reducer;
