/**
 * @file StoreNext.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { Middleware, configureStore, UnknownAction } from '@reduxjs/toolkit';

interface State {
  actions: UnknownAction[];
}

const mockReducer = (state = { actions: [] }) => state;

// Custom middleware to track actions
const trackActionsMiddleware: Middleware<any, State> = (storeAPI) => (next) => (action) => {
  const state = storeAPI.getState();
  if (!state.actions) {
    // Initialize actions array if it doesn't exist
    state.actions = [];
  }
  // Push every action to a specific array in the state
  state.actions.push(action as UnknownAction);

  return next(action);
};

const mockStore = (initialState: any) => {
  const store = configureStore({
    reducer: mockReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: false,
      }).concat(trackActionsMiddleware),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  });

  return {
    ...store,
    // Fallback when redux actions are not captured and undefined
    getActions: () => (store.getState().actions || []) as UnknownAction[],
  };
};

export default mockStore;
