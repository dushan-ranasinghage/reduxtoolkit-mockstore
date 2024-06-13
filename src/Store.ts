/**
 * @file Store.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - ResearchIt All Rights Reserved.
 */

import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import actionListenerMiddleware from './actionListenerMiddleware';

interface State {
  actions: UnknownAction[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockReducer = (state: State = { actions: [] }, action: UnknownAction) => state;

export function configureMockStore(initialState: State) {
  const store = configureStore({
    reducer: mockReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: false,
      }).prepend(actionListenerMiddleware.middleware),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  });

  return {
    ...store,
    getActions: () => store.getState().actions,
  };
}

export default configureMockStore;
