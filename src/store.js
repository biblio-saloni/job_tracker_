import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import jobsReducer from './features/jobs/jobsSlice';
// import filtersReducer from './features/jobs/filtersSlice';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobs: jobsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);