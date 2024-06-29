/**
 * @file store.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
      actionCreatorCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers();
  },
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
