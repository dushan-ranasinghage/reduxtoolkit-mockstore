/**
 * @file Store.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import { createListenerMiddleware } from '@reduxjs/toolkit';

const actionListenerMiddleware = createListenerMiddleware();

actionListenerMiddleware.startListening({
  predicate: () => true, // Always return true to listen to all actions
  effect: (action, listenerApi) => {
    listenerApi.dispatch({
      type: 'STORE_ACTION',
      payload: action,
    });
  },
});

const mockReducer = (state = { actions: [] }, action: UnknownAction) => {
  switch (action.type) {
    case 'STORE_ACTION':
      return {
        ...state,
        actions: [...state.actions, action.payload],
      };
    default:
      return state;
  }
};

export function configureMockStore(initialState: any) {
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
