/**
 * @file StoreNext.ts
 * @description
 * @author Dushan Ranasinghage
 * @copyright Copyright 2024 - Dushan Ranasinghage All Rights Reserved.
 */

import { UnknownAction, Reducer } from '@reduxjs/toolkit';

interface MockStore {
  getState: () => any;
  dispatch: (action: UnknownAction) => UnknownAction;
  getActions: () => UnknownAction[];
  clearActions: () => void;
}

const createMockStore = (rootReducer: Reducer<any, UnknownAction>, initialState?: Partial<any>): MockStore => {
  let state: any = rootReducer(initialState as any, {
    type: 'INIT',
  });

  const actions: UnknownAction[] = [];

  const store: MockStore = {
    getState: () => state,
    dispatch: (action: UnknownAction) => {
      actions.push(action);
      state = rootReducer(state, action);
      return action;
    },
    getActions: () => actions,
    clearActions: () => {
      actions.length = 0;
    },
  };

  return store;
};

// Export the createMockStore function
export default createMockStore;
