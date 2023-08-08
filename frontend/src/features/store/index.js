import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from '../hotelsSlice';

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    // Add more reducers for other slices if needed
  },
});

export default store;
