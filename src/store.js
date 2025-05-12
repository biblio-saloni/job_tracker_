import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobs/jobsSlice';
// import filtersReducer from './features/jobs/filtersSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    // filters: filtersReducer,
  },
});
