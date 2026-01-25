/**
 * @file Store.ts
 * @description Mock store implementation using root reducer
 * @author Dushan Ranasinghage
 * @copyright Copyright 2026 - Dushan Ranasinghage All Rights Reserved.
 */

import { UnknownAction, Reducer } from '@reduxjs/toolkit';

export interface MockStore {
  getState: () => any;
  dispatch: (action: UnknownAction | Function) => Promise<UnknownAction>;
  getActions: () => UnknownAction[];
  clearActions: () => void;
}

const createMockStore = (rootReducer: Reducer<any, UnknownAction>, initialState?: any): MockStore => {
  // Redux reducers expect undefined for initial state, not an empty object
  // If initialState is provided, use it; otherwise pass undefined
  let state: any = rootReducer(initialState, {
    type: '@@redux/INIT',
  });

  let actions: UnknownAction[] = [];

  const store: MockStore = {
    getState: () => state,
    dispatch: async (action: UnknownAction | Function) => {
      if (typeof action === 'function') {
        const result = await (action as any)(store.dispatch, store.getState);
        return result;
      }
      actions.push(action as UnknownAction);
      state = rootReducer(state, action as UnknownAction);
      return action as UnknownAction;
    },
    getActions: () => actions,
    clearActions: () => {
      actions = [];
    },
  };

  return store;
};

export default createMockStore;

export { createMockStore };
